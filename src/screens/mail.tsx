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
  View,
  Modal
} from 'native-base'

import { useState,useEffect } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, TextInput, Dimensions } from "react-native";
import axios from 'axios';
import {getRequest,postRequest} from '../axios';


const BASE_URL = serverLink;

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


import { Feather } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import Navbar from '../components/navbar'
import Masthead from '../components/masthead'
import LinkButton from '../components/link-button'
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import {serverLink} from "../utils/ServerLink";


const EmailScreen = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [text, setText] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selfIntro, setSelfIntro] = useState('');
  const [gptKey, setGptKey] = useState('');
  const [mail, setMail] = useState('');
  const [importance, setImportance] = useState('');
  const [register_info, setRegisterInfo] = useState('');

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRegister = async () => {
    try {
      const response = await axios({
        method: 'get',//请求方法
        params: {
          'name': name,
          'email': email,
          'email_password': password,
          'self_intro': selfIntro+'我希望你帮我判断一下下面这篇邮件我是否会感兴趣。请只用1到5之前的数字回答这个问题，1代表不感兴趣，5代表很感兴趣。',
          'gpt_key': gptKey
        },
        url: `${BASE_URL}/mail/add_account`,
    });
      // console.log(courses);
      console.log(response.data);
      setRegisterInfo(response.data);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };



  const handleRegisterModal = async () => {
    setShowModal(true);
  };


  const handleRequest = async () => {
    try {

      const response = await axios({
        method: 'get',//请求方法
        params: {
          'name': name
        },
        url: `${BASE_URL}/mail/email_brif`,
    });
      // console.log(courses);
      console.log(response.data.content);
      setMail(response.data.content);
      console.log(response.data.importance);
      setImportance(response.data.importance);
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
        <Navbar />
      </Masthead>



      <SafeAreaView style={styles.container}>
        <Text>当前状态：{register_info}</Text>
        <Text>您的最新邮件摘要：</Text>
        <Text>{mail}</Text>
        <Text>重要等级: {importance}</Text>

      </SafeAreaView>
      <View style={{height: 80}}></View>
      <Button onPress={handleRequest}>查询</Button>
      <View style={{height: 40}}></View>
      <Button onPress={handleRegisterModal}>注册</Button>
      <View style={{height: 180}}></View>
      <Modal isOpen={showModal} onClose={closeModal}>
        <Box
          bg="white"
          p={4}
          rounded="md"
          shadow={3}
          w={Dimensions.get('window').width - 32}
          maxHeight={Dimensions.get('window').height - 100}
          marginTop={-20}
        >
          <View style={{height: 5}}></View>
          <Text>姓名</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="请输入姓名"
            placeholderTextColor="darkgray"
          />
          <View style={{height: 20}}></View>
          <Text>邮箱</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="请输入邮箱"
            placeholderTextColor="darkgray"
          />
          <View style={{height: 20}}></View>
          <Text>密码</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="请输入密码"
            placeholderTextColor="darkgray"
          />
          <View style={{height: 20}}></View>
          <Text>自我介绍</Text>
          <TextInput
            value={selfIntro}
            onChangeText={(text) => setSelfIntro(text)}
            placeholder="自我介绍可以帮助GPT精简您的邮件并判定您的邮件的重要等级"
            placeholderTextColor="darkgray"
            multiline={true}
          />
          <View style={{height: 20}}></View>
          <Text>GPT Key</Text>
          <TextInput
            value={gptKey}
            onChangeText={(text) => setGptKey(text)}
            placeholder="请输入GPT Key"
            placeholderTextColor="darkgray"
          />
          <View style={{height: 20}}></View>
          <Button onPress={handleRegister}>注册</Button>
          <View style={{height: 30}}></View>
          <Button onPress={closeModal}>关闭</Button>
        </Box>
      </Modal>
    </AnimatedColorBox>
  )
}

export default EmailScreen
