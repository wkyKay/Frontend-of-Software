import React from 'react'
import {
  ScrollView,
  Text,
  Button,
  useColorModeValue,
  View
} from 'native-base'

import { useState,useEffect } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import axios from 'axios';

// function deepClone(data) {
//   let _data = JSON.stringify(data),
//   dataClone = JSON.parse(_data);
//   return dataClone;
// };

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
const DATA = [
  {
    id: "0",
    title: "First Item",
  },
  {
    id: "1",
    title: "Second Item",
  },
  {
    id: "2",
    title: "Third Item",
  },
];
const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.content}>{JSON.stringify(item.data)}</Text>
  </TouchableOpacity>
);

import AnimatedColorBox from '../components/animated-color-box'
import Navbar from '../components/navbar'
import Masthead from '../components/masthead'


const AboutScreen = () => {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#008B8B" : "#48D1CC";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    );
  };

  const [map, setMap] = useState(new Map())
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('http://10.26.137.106:5000');
        setMap(new Map(Object.entries(response.data)))
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);
  console.log(map);

  const data = Array.from(map, ([key, value]) => ({  id: key,
    title: value}));
    
  console.log(data);

  // const course_data = map.find(item => item.id === "data")?.title|| [];

  // const display = course_data.map((item, index) => {
  //   return { id: index.toString(), title: item.class_name + " " + item.teacher+" "+item.time };
  // });
  // console.log(course);

  const [text, setText] = useState('');
  const [multiSchemes, setMultiSchemes] = useState([]);
  
  const handleButtonClick = async () => {
    try {
      const courses = text.split(' ');
      const response = await axios({
        method: 'get',//请求方法
        params: {
            courses,
        },
        url: 'http://10.24.37.197:5000/select_class',
    });
      // console.log(courses);
      const multi_Schemes = response.data.data;
      setMultiSchemes(multi_Schemes);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(courses);

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
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={text => setText(text)}
          defaultValue={text}
        />
        <ScrollView>
          <View>
            {multiSchemes.map((row, rowIndex) => (
              <View key={rowIndex}>
                <Text>{'方案'+(rowIndex+1)}</Text>
                {row.map((item, itemIndex) => (
                  <Text key={`${rowIndex}-${itemIndex}`}>
                    {item.class_name} {item.teacher} {item.time}
                  </Text>
                ))}
                <Text key={`delimiter-${rowIndex}`}></Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <Text>{JSON.stringify(Object.fromEntries(map))}</Text>

        

        {/* </View> */}


        {/* <FlatList
          data={display}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        /> */}
      </SafeAreaView>
      <Button onPress={handleButtonClick}>就上这么多！</Button>


    </AnimatedColorBox>
  )
}

export default AboutScreen