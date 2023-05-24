import React, {useState, useCallback, useEffect} from "react"
import {Box, Button, HStack, Text, VStack} from 'native-base'
import Masthead from "../components/masthead"
import NavBar from "../components/navbar"
import { useColorModeValue } from "native-base"
import AnimatedColorBox from "../components/animated-color-box"
import InputBox from "../components/input-box"
import SearchButton from "../components/search-button"
import axios from 'axios'
import MyCourseList from "../components/course-item"
import { useNavigation } from '@react-navigation/native';
import { IconButton } from "native-base"
import { Feather } from '@expo/vector-icons';
import {serverLink} from "../utils/ServerLink";
import {getShareId} from "../components/DataContext";
import searchButton from "../components/search-button";

const CommentSection = () => {
    const link_route = serverLink;
    interface CourseItem {
        id:string
        name: string
        course_id:string
        class_name: string
        kind: string
        classes:string
        language: string
        score:string
        credit:string
        period:string
        teacher:string,
        time:string
        capacity:string
        star:string
        college:string
      }

    interface CommentItem {
        id:string
        teacher_name:string
        student_id:string
        student_name: string
        course_id:string
        reply_student:string
        content:string
    }

    const [college, setCollege] = useState("")
    const [course, setCourse] = useState("")
    const [teacher, setTeacher] = useState("")
    const [send_text, setSending] = useState("")
    const [course_data, setCourseData] = useState([])
    const [comment_data, setCommentData] = useState<CommentItem[]>([]);
    const handleChangeCollege = useCallback(college =>
        {setCollege(college)
    },[])
    const handleChangeCourse = useCallback(course =>
        {setCourse(course)
    },[])
    const handleChangeTeacher = useCallback(teacher =>
        {setTeacher(teacher)
    },[])

    const renderCourseItem = ({ item }: { item: CourseItem }) => (
        <HStack >
          <Box width="60px" marginLeft={1} marginTop={1} bgColor={'#7491B9'} borderTopLeftRadius={5} borderBottomLeftRadius={5}> {item.name}</Box>
          <Box width = "55px" marginLeft={1} marginTop={1} bgColor={'#B1C1D8'}> {item.course_id}</Box>
          <Box width = "52px" marginLeft={1} marginTop={1} bgColor={'#92A9C9'}> {item.teacher}</Box>
          <Box width = "70px" marginLeft={1} marginTop={1} bgColor={'#7491B9'}> {item.time}</Box>
          <Box width = "55px" marginLeft={1} marginTop={1} bgColor={ '#5578AA'} borderTopRightRadius={5} borderBottomRightRadius={5}> {item.college}</Box>
          <IconButton
                onPress={() => {
                    nav.navigate("CommentPage", {item: item}as CourseItem);
                  }
                }
                borderRadius={100}
                borderColor={'blue.300'}
                bgColor={'blue'}
                _icon={{
                  as: Feather,
                  name: 'search',
                  size: 6,
                  color: 'black'
                }}
                />
        </HStack>

      );


    useEffect(() =>
        {
            const newData = "id=" +getShareId() +"&college="+college+"&course="+course+"&teacher="+teacher
            setSending(newData)
    },[college, course, teacher])
    const nav = useNavigation()
    return (

        <AnimatedColorBox
        flex={1}

        bg={useColorModeValue('warmGray.50', 'primary.900')}
        w="full">
            <Masthead
                title="Comment Section"
                image={require('../assets/forComment3.jpg')}
            >
                <NavBar />
                <VStack>
                <HStack>
                    <InputBox
                    input_text={college}
                    place_holder="college"
                    onChangeSubject={handleChangeCollege}
                    width="110"/>
                    <InputBox
                    input_text={course}
                    place_holder="course"
                    onChangeSubject={handleChangeCourse}
                    width="110"/>
                    <InputBox
                    input_text={teacher}
                    place_holder="teacher"
                    onChangeSubject={handleChangeTeacher}
                    width="110"/>

                </HStack>
                <SearchButton
                     active={true}
                     icon={"search"}
                     onPress={() => {
                        axios.get(
                            link_route + "/getCourseList?"+send_text
                          ).then(response => {
                            setCourseData(response.data)
                          }).catch(error => {
                            // 处理错误
                            console.log(error);
                          });
                      }}
                    >
                        Search
                    </SearchButton>
                </VStack>
            </Masthead>

            <VStack
                mt="-20px"
                bg={useColorModeValue('warmGray.50', 'primary.900')}
                borderTopLeftRadius="20px"
                borderTopRightRadius="20px"
                pt="20px"
            >
                <HStack>
                    <Box alignItems={"center"} width="61px" marginLeft={1} marginTop={1} bgColor={'blue.400'} borderTopLeftRadius={5} borderBottomLeftRadius={5}>课程</Box>
                    <Box alignItems={"center"} width = "59px"  marginTop={1} bgColor={'blue.300'}>编号</Box>
                    <Box alignItems={"center"} width = "58px"  marginTop={1} bgColor={'blue.400'}>教师</Box>
                    <Box alignItems={"center"} width = "74px"  marginTop={1} bgColor={'blue.300'}>时间</Box>
                    <Box alignItems={"center"} width = "56px"  marginTop={1} bgColor={ 'blue.400'} borderTopRightRadius={5} borderBottomRightRadius={5}>院系</Box>
                </HStack>

                <MyCourseList data={course_data} renderItem={renderCourseItem}></MyCourseList>


            </VStack>
        </AnimatedColorBox>
    )
}

export default CommentSection
