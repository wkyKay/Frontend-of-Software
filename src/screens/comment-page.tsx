import React from 'react';
import MyCommentList from '../components/comment-item';
import { HStack, Box, VStack, IconButton, Input, Button } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';
import Masthead from '../components/masthead';
import AnimatedColorBox from '../components/animated-color-box';
import { useColorModeValue } from 'native-base';
import { Feather } from '@expo/vector-icons'
import { useState, useCallback } from 'react';
import { TextArea } from 'native-base';
import { View } from 'native-base';

interface CommentItem {
  id: string
  teacher_name: string
  student_id: string
  student_name: string
  course_id: string
  reply_student: string
  content: string
}

interface Props {
  comment_data: CommentItem[];
}

const CommentPage = () => {

  const { comment_data } = useRoute().params as Props
  const nav = useNavigation()
  const [data, setData] = useState("")

  const handleChangeData = useCallback(data => {
    setData(data)
  }, [])

  const renderCommentItem = ({ item }: { item: CommentItem }) => (
    <VStack>
      <HStack>
        <Box width="80px" marginLeft="5px" marginTop={1} bgColor={'blueGray.400'}> {item.student_id}</Box>
        <Box width="80px" marginLeft="5px" marginTop={1} bgColor={'blueGray.400'}> {item.student_name}</Box>
        <Box width="90px" marginLeft="5px" marginTop={1} bgColor={'blueGray.400'}> {item.teacher_name}</Box>
        <Box width="85px" marginLeft="5px" marginTop={1} bgColor={'blueGray.400'}> {item.reply_student}</Box>
      </HStack>
      <Box height="100px" marginLeft={1} marginTop={1} bgColor={'blueGray.300'} width="350px" marginBottom="15px"> {item.content}</Box>
    </VStack>

  );
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full">
      <Masthead
        title="评论区"
        image={require('../assets/forComment2.jpg')}
      >
        <HStack w="full" h="110px" alignItems="center" alignContent="center" p={4}>
          <IconButton
            onPress={() => nav.navigate("Comment")}
            borderRadius={100}
            borderColor={useColorModeValue('blue.300', 'darkBlue.700')}
            _icon={{
              as: Feather,
              name: 'chevron-left',
              size: 6,
              color: 'white'
            }}
          />
        </HStack>
        <HStack>
          <HStack>
            <TextArea
              marginLeft={5}
              type="text"
              width={300}
              height="50px"
              fontSize={17}
              bgColor={'white'}
              value={data}
              onChange={handleChangeData}
              placeholder="share something..."
            // 设置初始的行数
            />
          </HStack>
          <IconButton
            onPress={() => nav.navigate("Comment")}
            borderRadius={100}
            borderColor={'blue.300'}
            _icon={{
              as: Feather,
              name: 'upload',
              size: 6,
              color: 'white'
            }}
          />
        </HStack>

      </Masthead>
      <VStack
        mt="-20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
      >
        <View>
          <MyCommentList data={comment_data} renderCommentItem={renderCommentItem}></MyCommentList>
        </View>
      </VStack>
    </AnimatedColorBox >
  );
}


export default CommentPage;