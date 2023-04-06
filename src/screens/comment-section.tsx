import React, {useState, useCallback, useEffect} from "react"
import { Box, HStack, Text, VStack } from 'native-base'
import Masthead from "../components/masthead"
import NavBar from "../components/navbar"
import { useColorModeValue } from "native-base"
import AnimatedColorBox from "../components/animated-color-box"
import SearchBox from "../components/search-box"
import SearchButton from "../components/search-button"
import axios from 'axios'
import MyCourseList from "../components/course-item"
import { Button } from "native-base"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CommentPage from "./comment-page"
import { useNavigation } from '@react-navigation/native';

const CommentSection = () => {
    
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
        <HStack>
          <Box width={20} marginLeft={1} marginTop={1} bgColor={'blue.100'}> {item.name}</Box>
          <Box width = {20}marginLeft={1} marginTop={1} bgColor={'blue.200'}> {item.course_id}</Box>
          <Box width = {20} marginLeft={1} marginTop={1} bgColor={'blue.300'}> {item.class_name}</Box>
          <Box width = {20} marginLeft={1} marginTop={1} bgColor={'blue.400'}> {item.teacher}</Box>
          <Box width = {20} marginLeft={1} marginTop={1} bgColor={'blue.500'}> {item.time}</Box>
          <Box width = {20} marginLeft={1} marginTop={1} bgColor={'blue.600'}> {item.college}</Box>
          <Button width = {20} marginLeft={1} marginTop={1}
          onPress={() => {
            axios.get(
                "http://10.32.48.213:5000/getCourseComments?course_id="+item.id
              ).then(response => {
                  setCommentData(response.data)
              }).catch(error => {
                console.log(error);
              });
              nav.navigate("CommentPage", {comment_data: comment_data}as CommentItem[])
          }
          }>
            GO
        </Button>
        </HStack>
        
      );


    useEffect(() =>
        {
            const newData = "id=12011129&college="+college+"&course="+course+"&teacher="+teacher
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
                image={require('../assets/forComment.jpg')}
            >
                <NavBar />
                <VStack>
                <HStack>
                    <SearchBox 
                    input_text={college} 
                    place_holder="college"
                    onChangeSubject={handleChangeCollege}/>
                    <SearchBox 
                    input_text={course} 
                    place_holder="course"
                    onChangeSubject={handleChangeCourse}/>
                    <SearchBox 
                    input_text={teacher} 
                    place_holder="teacher"
                    onChangeSubject={handleChangeTeacher}/>
                    
                </HStack>
                <SearchButton
                     active={true}
                     icon = "question"
                     onPress={() => {
                        axios.get(
                            "http://10.32.48.213:5000/getCourseList?"+send_text
                          ).then(response => {
                            setCourseData(response.data)
                          }).catch(error => {
                            // 处理错误
                            console.log(error);
                          });;
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
                <MyCourseList data={course_data} renderItem={renderCourseItem}></MyCourseList>
                
            </VStack>
        </AnimatedColorBox>
    )
}

export default CommentSection