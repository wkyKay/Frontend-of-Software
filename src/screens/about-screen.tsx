import React from 'react'
import {
  ScrollView,
  Text,
  Button,
  useColorModeValue,
  View,
  extendTheme
} from 'native-base'

import { useState,useEffect } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import axios from 'axios';
import {useNavigation} from "@react-navigation/native";
import {serverLink} from "../utils/ServerLink";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 20,
      color: 'black',
    },
  });
const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.content}>{JSON.stringify(item.data)}</Text>
  </TouchableOpacity>
);

import AnimatedColorBox from '../components/animated-color-box'
import Navbar from '../components/navbar'
import Masthead from '../components/masthead'

const BASE_URL = serverLink;

const AboutScreen = () => {
  const [selectedId, setSelectedId] = useState(null);

  const [map, setMap] = useState(new Map())
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${BASE_URL}/get_data`);
        setMap(new Map(Object.entries(response.data)))
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  const data = Array.from(map, ([key, value]) => ({  id: key,
    title: value}));

  const course_data = data.find(item => item.id === "data")?.title|| [];

  const uniqueCourseData = [...new Map(course_data.map(item => [item.class_name, item])).values()];

  const nav = useNavigation();


  const [text, setText] = useState('');
  // const [multiSchemes, setMultiSchemes] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cancelItem, setCancelItem] = useState('');


  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResults, setSelectedResults] = useState([]);

  const handleItemPress = (item) => {
    // 处理点击事件，可以根据需要进行相应的操作
    const index = selectedResults.findIndex(selectedItem => selectedItem.class_name === item.class_name&&selectedItem.teacher === item.teacher&&selectedItem.time === item.time);
    if(index ===-1){
      const updatedSelectedResults = [...selectedResults, item];
      setSelectedResults(updatedSelectedResults);
      console.log('选择了', item.class_name);
    }else{
      console.log('选择了重复课程');
    }

  };

  const handleSelectedItemPress = (item) => {
    // 处理点击事件，可以根据需要进行相应的操作
    // const itemText = `${item.class_name} - ${item.teacher} - ${item.time}`;
    // setCancelItem(itemText);
    console.log('删除了', item.class_name);

    // 查找被点击的项在 selectedResults 中的索引
    const index = selectedResults.findIndex(selectedItem => selectedItem.class_name === item.class_name&&selectedItem.teacher === item.teacher&&selectedItem.time === item.time);

    if (index !== -1) {
      // 如果找到了被点击的项，使用 splice 方法从 selectedResults 中删除该项
      const updatedResults = [...selectedResults];
      updatedResults.splice(index, 1);
      setSelectedResults(updatedResults);
    }
  };



  const handleButtonClick = async () => {
    try {
      const courses = selectedResults.map(item => item.class_name);
      if (courses.length === 0) {
        // courses为空，不发送请求，可以选择不执行任何操作或者进行其他处理
        return;
      }
      const response = await axios({
        method: 'get',//请求方法
        params: {
            courses,
        },
        url: `${BASE_URL}/select_class`,
    });
      // console.log(courses);
      if(response.data.data.length>0){
        const multi_Schemes = response.data.data;
        nav.navigate("MultiSchemes", {multi_Schemes});
      }else{
        console.log('没有符合的方案');
      }
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(courses);




  const handleSearch = () => {
    const results = uniqueCourseData.filter(item => {
      // 在这里编写搜索条件的逻辑
      const searchTerm = searchText.toLowerCase();
      const className = item.class_name.toLowerCase();
      return className.includes(searchTerm);
    });
    selectedResults.forEach(item => {
      console.log('已选:',item.class_name);
    });
    if (results.length === 0) {
      setSearchResults([]); // 设置搜索结果为空数组
    } else {
      setSearchResults(results);
    }
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#008B8B" : "#48D1CC";

    return (
      <View style={{ marginBottom: 10 , borderRadius: 8}}>
        <TouchableOpacity
          onPress={() => handleItemPress(item)}
          style={{ backgroundColor: backgroundColor, borderRadius: 8, padding: 10 }}
        >
          <Text>
            {item.class_name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };


  const selectedItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#FFD700" : "#FFFF00";

    return (
      <View style={{ marginBottom: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          // onPress={() => handleSelectedItemPress(item)}
          style={{ backgroundColor: backgroundColor, borderRadius: 8, padding: 10, flex: 1 }}
        >
          <Text>
            {item.class_name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectedItemPress(item)}>
          <Text style={{ fontSize: 18, color: 'red', marginLeft: 8 }}>×</Text>
        </TouchableOpacity>
      </View>
    );
  };




  return (

    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w="full"
    >

      <Masthead
        title="选课方案生成"
        image={require('../assets/about-masthead.png')}
      >
        <Navbar />
      </Masthead>
      {/* <Text>
        {data[0]}
      </Text> */}


      <SafeAreaView style={styles.container}>
        {/* <View style={{padding: 10}}> */}

        <View style={{ flex: 1, padding: 16 }}>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={{ flex: 1, height: 40, borderWidth: 1, padding: 8, marginRight: 8 }}
              placeholder="输入搜索内容"
              value={searchText}
              onChangeText={text => setSearchText(text)}
            />
            <Button onPress={handleSearch} style={{ height: 40 }}>搜索课程</Button>
          </View>
          <View style={{ height: 5 }}></View>

          <SafeAreaView style={styles.container}>
            <Text>已选课程：</Text>
            <FlatList
              data={selectedResults}
              keyExtractor={(item, index) => index.toString()}
              renderItem={selectedItem}
            />
          </SafeAreaView>

          <View style={{ height: 5 }}></View>

          <SafeAreaView style={styles.container}>
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </SafeAreaView>
        </View>
      </SafeAreaView>
      <Button onPress={handleButtonClick}>就上这么多！</Button>


    </AnimatedColorBox>
  )
}

export default AboutScreen
