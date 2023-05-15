import React from 'react'
import {
    ScrollView,
    Box,
    Text,
    Button,
    VStack,
    Icon,
    Image,
    useColorModeValue,
    View
} from 'native-base'

import {useState, useEffect} from "react";
import {FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import axios from 'axios';
import {getRequest, postRequest} from '../axios';

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
const Item = ({item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{JSON.stringify(item.data)}</Text>
    </TouchableOpacity>
);

import {Feather} from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import Navbar from '../components/navbar'
import Masthead from '../components/masthead'
import LinkButton from '../components/link-button'
import {Double} from 'react-native/Libraries/Types/CodegenTypes';
import {serverLink} from "../utils/ServerLink";


const EmailScreen = () => {
    const link_route:string =serverLink;
    const [selectedId, setSelectedId] = useState(null);
    const renderItem = ({item}) => {
        const backgroundColor = item.id === selectedId ? "#008B8B" : "#48D1CC";

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                style={{backgroundColor}}
            />
        );
    };

    const [map, setMap] = useState(new Map())
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(link_route);
                setMap(new Map(Object.entries(response.data)))
            } catch (error) {
                console.error(error);
            }
        }

        getData();
    }, []);
    // console.log(map);


    // const contents = [];
    // const importances = [];

    // map.forEach((value, key) => {
    //   contents.push(value.content);
    //   importances.push(value.importance);
    // });

    // console.log(contents[0]);
    // console.log(importances);

    // console.log(contentArr);


    const maildata = Array.from(map, ([key, value]) => ({
        id: key,
        title: value
    }));

    const mailcontent = maildata.find(item => item.id === "content")?.title || [];
    const mailimportance = maildata.find(item => item.id === "importance")?.title || [];
    // console.log(mailcontent);


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
                url: link_route + '/select_class',
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
                title="最新邮件摘要"
                image={require('../assets/about-masthead.png')}
            >
                <Navbar/>
            </Masthead>
            {/* <Text>
        {data[0]}
      </Text> */}


            <SafeAreaView style={styles.container}>
                {/* <View style={{padding: 10}}> */}
                {/* <TextInput
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
        </ScrollView> */}
                {/* <Text>{JSON.stringify(contents)}</Text>
        <Text>{JSON.stringify(importances)}</Text> */}

                <Text>Content:</Text>
                <Text> {mailcontent[0]}</Text>
                <Text>Importance: {mailimportance[0]}</Text>


                {/* </View> */}


                {/* <FlatList
          data={display}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        /> */}
            </SafeAreaView>
            {/* <Button onPress={handleButtonClick}>就上这么多！</Button> */}


        </AnimatedColorBox>
    )
}

export default EmailScreen
