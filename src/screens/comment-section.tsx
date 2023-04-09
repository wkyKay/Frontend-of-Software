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
import { useNavigation } from '@react-navigation/native';
import { IconButton } from "native-base"
import { Feather } from '@expo/vector-icons';
import { View } from "native-base"
import { Dimensions } from "react-native"

const CommentSection = () => {
    
    const { height } = Dimensions.get('window');
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
          <Box width="60px" marginLeft={1} marginTop={1} bgColor={'info.300'}> {item.name}</Box>
          <Box width = "55px" marginLeft={1} marginTop={1} bgColor={'primary.300'}> {item.course_id}</Box>
          <Box width = "52px" marginLeft={1} marginTop={1} bgColor={'info.300'}> {item.teacher}</Box>
          <Box width = "70px" marginLeft={1} marginTop={1} bgColor={'primary.300'}> {item.time}</Box>
          <Box width = "55px" marginLeft={1} marginTop={1} bgColor={'info.300'}> {item.college}</Box>
          <IconButton
                onPress={() => {
                    axios.get(
                        "http://10.25.4.137:5000/getCourseComments?course_id="+item.id
                      ).then(response => {
                          setCommentData(response.data)
                      }).catch(error => {
                        console.log(error);
                      });
                      nav.navigate("CommentPage", {comment_data: comment_data}as CommentItem[])
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
                image={require('../assets/forComment3.jpg')}
            >
                <NavBar />
                <VStack>
                <HStack>
                    <SearchBox 
                    input_text={college} 
                    place_holder="college"
                    onChangeSubject={handleChangeCollege}
                    width="110"/>
                    <SearchBox 
                    input_text={course} 
                    place_holder="course"
                    onChangeSubject={handleChangeCourse}
                    width="110"/>
                    <SearchBox 
                    input_text={teacher} 
                    place_holder="teacher"
                    onChangeSubject={handleChangeTeacher}
                    width="110"/>
                    
                </HStack>
                <SearchButton
                     active={true}
                     icon={null}
                     onPress={() => {
                        axios.get(
                            "http://10.25.4.137:5000/getCourseList?"+send_text
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
                <View style={{ height }}>
                <MyCourseList data={course_data} renderItem={renderCourseItem}></MyCourseList>
                <Text></Text>
                </View>
            </VStack>
        </AnimatedColorBox>
    )
}

export default CommentSection