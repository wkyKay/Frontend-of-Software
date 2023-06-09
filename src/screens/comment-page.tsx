import React from 'react';
import MyCommentList from '../components/comment-item';
import {HStack, Box, VStack, IconButton, Input, Button} from 'native-base';
import {useRoute, useNavigation} from '@react-navigation/native';
import Masthead from '../components/masthead';
import AnimatedColorBox from '../components/animated-color-box';
import {useColorModeValue} from 'native-base';
import {Feather} from '@expo/vector-icons'
import {useState, useCallback} from 'react';
import {TextArea} from 'native-base';
import {useEffect} from 'react';
import axios from 'axios';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native'
import {serverLink} from "../utils/ServerLink";
import {getShareId} from "../components/DataContext";

interface CommentItem {
    id: string
    teacher_name: string
    student_id: string
    student_name: string
    course_id: string
    reply_student: string
    content: string
}

interface CourseItem {
    id: string
    name: string
    course_id: string
    class_name: string
    kind: string
    classes: string
    language: string
    score: string
    credit: string
    period: string
    teacher: string,
    time: string
    capacity: string
    star: string
    college: string
}

interface Props {
    comment_data: CommentItem[];
}

const CommentPage = () => {
    const link_route = serverLink;

    const route = useRoute();
    const [comment_data, setCommentData] = useState<Props>();
    let item: CourseItem = route.params?.item as CourseItem
    useEffect(() => {
        axios.get(link_route + "/getCourseComments?course_id=" + item.id)
            .then(response => {
                setCommentData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [item.id]);

    const formData = new FormData();
    formData.append('student_id', getShareId());
    formData.append('course_id', item.id)
    formData.append("reply_to", "")

    const nav = useNavigation()
    const [data, setData] = useState<string>("")
    const handleChangeData = useCallback(data => {
        setData(data)
    }, [])

    const handleChangeSubject = useCallback(
        (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
            handleChangeData(e.nativeEvent.text)
        },
        [handleChangeData]
    )

    const renderCommentItem = ({item}: { item: CommentItem }) => (
        <VStack>
            <HStack>
                <Button width="100px" marginLeft="5px" bgColor={'blueGray.500'}
                        height="45px"> {item.student_id}</Button>
                <Box width="120px" marginLeft="5px" bgColor={'blueGray.400'}
                     alignItems="center" alignContent="center" borderTopRightRadius={5} borderTopLeftRadius={5}
                     borderBottomLeftRadius={5} borderBottomRightRadius={5}
                > {item.student_name}</Box>
                <Box width="120px" marginLeft="5px" bgColor={'blueGray.400'} borderTopRightRadius={5}
                     borderTopLeftRadius={5} borderBottomLeftRadius={5} borderBottomRightRadius={5}
                     alignItems="center" alignContent="center"> {item.teacher_name}</Box>
            </HStack>
            <Box height="100px" marginLeft={1} marginTop={1} bgColor={'blueGray.300'} width="350px"
                 marginBottom="15px" borderTopRightRadius={10} borderTopLeftRadius={10} borderBottomLeftRadius={10}
                 borderBottomRightRadius={10}> {item.content}</Box>
        </VStack>

    );

    return (
        <AnimatedColorBox
            flex={1}
            bg={useColorModeValue('warmGray.50', 'primary.900')}
            w="full">
            {/*id: string*/}
            {/*name: string*/}
            {/*course_id: string*/}
            {/*class_name: string*/}
            {/*kind: string*/}
            {/*classes: string*/}
            {/*language: string*/}
            {/*score: string*/}
            {/*credit: string*/}
            {/*period: string*/}
            {/*teacher: string,*/}
            {/*time: string*/}
            {/*capacity: string*/}
            {/*star: string*/}
            {/*college: string*/}
            <Masthead
                title={item.class_name.toString() + "\n" + item.teacher.toString()}
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
                            type="text"
                            marginLeft={5}
                            width={300}
                            height="50px"
                            fontSize={17}
                            bgColor={'white'}
                            value={data}
                            onChange={handleChangeSubject}
                            placeholder="share something..."
                            // 设置初始的行数
                        />
                    </HStack>
                    <IconButton
                        onPress={() => {
                            if(data != "") {

                                formData.append("content", data)

                                axios.post(link_route + '/postComment?course_id=' + item.id, formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                }).then(response => {
                                    setCommentData(response.data);
                                    setData("");
                                    // console.log('Login succeeded:');
                                }).catch(error => {
                                    console.error('Login failed:', error);
                                })
                            }

                        }}
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
                <HStack >
                    <Box width="102px" marginLeft="5px" bgColor={'blue.300'}
                         alignItems="center" alignContent="center" borderTopRightRadius={5} borderTopLeftRadius={5}
                         borderBottomLeftRadius={5} borderBottomRightRadius={5}
                         height="20px"> id:</Box>
                    <Box width="125px" bgColor={'blue.400'}
                         alignItems="center" alignContent="center" borderTopRightRadius={5} borderTopLeftRadius={5}
                         borderBottomLeftRadius={5} borderBottomRightRadius={5}  height="20px"
                    > name: </Box>
                    <Box width="122px" bgColor={'blue.300'} borderTopRightRadius={5}
                         borderTopLeftRadius={5} borderBottomLeftRadius={5} borderBottomRightRadius={5}
                         alignItems="center" alignContent="center"  height="20px"> teacher: </Box>
                </HStack>
                <MyCommentList data={comment_data} renderCommentItem={renderCommentItem}></MyCommentList>
            </VStack>
        </AnimatedColorBox>
    );
}


export default CommentPage;
