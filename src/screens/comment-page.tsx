import React from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer'
import MyCommentList from '../components/comment-item';
import { HStack, Box, VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';
import Masthead from '../components/masthead';
import NavBar from '../components/navbar';
import AnimatedColorBox from '../components/animated-color-box';
import { useColorModeValue } from 'native-base';

interface CommentItem {
    id:string
    teacher_name:string
    student_id:string
    student_name: string
    course_id:string
    reply_student:string
    content:string
}

interface Props{
  comment_data:CommentItem[];
}

const CommentPage = () => {

    const {comment_data} = useRoute().params as Props

    const renderCommentItem = ({ item }: { item: CommentItem }) => (
        <HStack>
          <Box width={20} marginLeft={1} marginTop={1} bgColor={'yellow.300'}> {item.student_id}</Box>
          <Box width = {20}marginLeft={1} marginTop={1} bgColor={'yellow.400'}> {item.course_id}</Box>
          <Box width = {20} marginLeft={1} marginTop={1} bgColor={'yellow.500'}> {item.teacher_name}</Box>
          <Box width = {20} marginLeft={1} marginTop={1} bgColor={'yellow.600'}> {item.teacher_name}</Box>
          <Box width = {20} marginLeft={1} marginTop={1} bgColor={'yellow.700'}> {item.reply_student}</Box>
          <Box width = {20} marginLeft={1} marginTop={1} bgColor={'yellow.800'}> {item.content}</Box>
        </HStack>
        
      );
  return (
    <AnimatedColorBox  
    flex={1}
    bg={useColorModeValue('warmGray.50', 'primary.900')}
    w="full">
        <Masthead
                title="你好"
                image={require('../assets/commentpage.jpg')}
            >
            <NavBar />
        </Masthead>
        <VStack
                mt="-20px"
                bg={useColorModeValue('warmGray.50', 'primary.900')}
                borderTopLeftRadius="20px"
                borderTopRightRadius="20px"
                pt="20px"
            >
              <MyCommentList data={comment_data} renderCommentItem={renderCommentItem}></MyCommentList>  
          </VStack>
      
            </AnimatedColorBox >
  );
}


export default CommentPage;