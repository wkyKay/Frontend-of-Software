import React from 'react'
import {
  ScrollView,
  Box,
  Text,
  VStack,
  Icon,
  Image,
  useColorModeValue,
  View,
  Modal
} from 'native-base'

import { useState,useEffect } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, TextInput, Dimensions,KeyboardAvoidingView,Button } from "react-native";
import axios from 'axios';
import {getRequest,postRequest} from '../axios';
const BASE_URL = serverLink;

// function deepClone(data) {
//   let _data = JSON.stringify(data),
//   dataClone = JSON.parse(_data);
//   return dataClone;
// };


import { Feather } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import Navbar from '../components/navbar'
import Masthead from '../components/masthead'
import {serverLink} from "../utils/ServerLink";



const ChatScreen = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [text, setText] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [name, setName] = useState('');
  const [gptKey, setGptKey] = useState('');
  const [mail, setMail] = useState('');
  const [importance, setImportance] = useState('');
  const [register_info, setRegisterInfo] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const closeModal = () => {
    setShowModal(false);
  };
  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleRegister = async () => {
    try {
      const response = await axios({
        method: 'get',//请求方法
        params: {
          'name': name,
          'gpt_key': gptKey
        },
        url: `${BASE_URL}/ai/add_account`,
    });
      // console.log(courses);
      console.log(response.data);
      setRegisterInfo(response.data);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios({
        method: 'get',//请求方法
        params: {
          'name': name,
          'gpt_key': gptKey
        },
        url: `${BASE_URL}/ai/modify_account`,
    });
      // console.log(courses);
      console.log(response.data);
      setRegisterInfo(response.data);
      setShowUpdateModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegisterModal = async () => {
    setShowModal(true);
  };

  const handleUpdateModal = async () => {
    setShowUpdateModal(true);
  };

  const handleClearMessages = async () => {
    setMessages([]); // 清空消息记录
    try {
      const response = await axios({
        method: 'get',//请求方法
        params: {
          'name': name
        },
        url: `${BASE_URL}/ai/refresh`,
    });
      // console.log(courses);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    if (inputText.trim() === '') {
      return;
    }
    const tmp_input = inputText;
    setInputText(''); // 清空输入框

    const userMessage = {
      content: tmp_input,
      sender: 'user' // 用户发送的消息
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const response = await axios({
        method: 'get',
        params: {
          'name': name,
          'content': tmp_input
        },
        url: `${BASE_URL}/ai/ai_chat`,
      })

      // 添加新消息到聊天记录
      // const userMessage = {
      //   content: inputText,
      //   sender: 'user' // 用户发送的消息
      // };
      const aiMessage = {
        content: response.data,
        sender: 'ai' // AI的响应消息
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  };

  // console.log(courses);

  return (

    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
    <View style={styles.header}>
      <View style={styles.topBar} />
      <Navbar />
    </View>

      <View style={styles.registerButtonContainer}>
        <Button title="清屏" onPress={handleClearMessages} />
        <Button title="注册" onPress={handleRegisterModal} />
        <Button title="更新GPT key" onPress={handleUpdateModal} />
      </View>
          <FlatList
      data={messages}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <View
            style={[
              styles.messageContainer,
              item.sender === 'user' ? styles.userMessageContainer : styles.aiMessageContainer
            ]}
          >
            <View
              style={[
                styles.message,
                item.sender === 'user' ? styles.userMessage : styles.aiMessage
              ]}
            >
              <Text style={styles.messageText}>{item.content}</Text>
            </View>
          </View>
        );
      }}
    />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={text => setInputText(text)}
          placeholder="请输入消息"
        />
        <Button title="发送" onPress={sendMessage} />
      </View>
      <Modal isOpen={showUpdateModal} onClose={closeUpdateModal}>
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
          <Text>GPT Key</Text>
          <TextInput
            value={gptKey}
            onChangeText={(text) => setGptKey(text)}
            placeholder="请输入GPT Key"
            placeholderTextColor="darkgray"
          />
          <View style={{height: 20}}></View>
          <Button title='注册' onPress={handleUpdate} />
          <View style={{height: 10}}></View>
          <Button title='关闭' onPress={closeUpdateModal} />
        </Box>
      </Modal>
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
          <Text>GPT Key</Text>
          <TextInput
            value={gptKey}
            onChangeText={(text) => setGptKey(text)}
            placeholder="请输入GPT Key"
            placeholderTextColor="darkgray"
          />
          <View style={{height: 20}}></View>
          <Button title='注册' onPress={handleRegister} />
          <View style={{height: 10}}></View>
          <Button title='关闭' onPress={closeModal} />
        </Box>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  messageContainer: {
    marginBottom: 8
  },
  message: {
    maxWidth: '80%',
    borderRadius: 8,
    padding: 8
  },
  messageText: {
    fontSize: 16
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8
  },
  registerButtonContainer: {
    position: 'absolute',
    flexDirection:'row',
    marginTop:52,
    marginLeft: 160
  },
  userMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: 8
  },
  aiMessageContainer: {
    alignItems: 'flex-start',
    marginBottom: 8
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    borderRadius: 8,
    padding: 8,
    maxWidth: '80%'
  },
  aiMessage: {
    backgroundColor: '#F8ECC2',
    alignSelf: 'flex-start',
    borderRadius: 8,
    padding: 8,
    maxWidth: '80%'
  },
  topBar: {
    position:'absolute',
    height: 110,
    width: 500,
    backgroundColor: 'lightblue',
    marginBottom: 16,
    marginLeft:-20,
    marginTop:-20
  },
  header: {
    position: 'relative',
    marginBottom: 16
  },
});

export default ChatScreen;
