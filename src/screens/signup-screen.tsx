import AnimatedColorBox from "../components/animated-color-box";
import {Box, Button, HStack, Input, useColorModeValue, VStack} from "native-base";
import React, {useCallback, useEffect, useState} from "react";
import {NativeSyntheticEvent, TextInputChangeEventData} from "react-native";
import {useNavigation} from "@react-navigation/native";
import inputBox from "../components/input-box";
import InputBox from "../components/input-box";
import {Text} from "native-base";
import axios from "axios";
import {serverLink} from "../utils/ServerLink";
import { View, ScrollView, StyleSheet } from 'react-native';
import Masthead from "../components/masthead";

const SignupScreen = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
        },
        contentContainer: {
            paddingBottom: 800, // 设置底部填充
        },
    });
    const link_route = serverLink;
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");//昵称
    const [name, setName] = useState("");//真实姓名
    const [password, setPassword] = useState("");
    //gender should be checkbox
    const [gender, setGender] = useState("");
    const [major, setMajor] = useState("");
    const [email, setEmail] = useState("");
    const [email_password, setEmailPassword] = useState("");


    const handleChangeId = useCallback(id => {
        setId(id);
    }, [])
    const handleChangeUsername = useCallback(username => {
        setUsername(username)
    }, [])
    const handleChangeName = useCallback(name => {
        setName(name)
    }, [])
    const handleChangePassword = useCallback(password => {
        setPassword(password)
    }, [])
    const handleChangeGender = useCallback(gender => {
        setGender(gender);
    }, [])
    const handleChangeMajor = useCallback(major => {
        setMajor(major);
    }, [])
    const handleChangeEmail = useCallback(email => {
        setEmail(email);
    }, [])
    const handleChangeEmailPassword = useCallback(email_password => {
        setEmailPassword(email_password);
    }, [])

    const nav = useNavigation();
    const formData = new FormData();
    const [warning, setWarning] = useState("");

    useEffect(() => {
        setWarning(warning)
    }, [warning]);

    return (
        <ScrollView>
            <View style={styles.contentContainer}>


            <VStack w="full" h="110px" marginTop={20} alignItems="center" alignContent="center" p={4}>
                <Box bg={"orange.300"} marginBottom={2} alignItems={"center"}>{warning}</Box>

                <HStack>
                    <Text fontSize={18}>学号:</Text>
                    <InputBox input_text={id} place_holder={"id"} onChangeSubject={handleChangeId} width="200"/>
                </HStack>

                <HStack marginTop={5}>
                    <Text fontSize={18}>真实姓名:</Text>
                    <InputBox input_text={username} place_holder={"username"} onChangeSubject={handleChangeUsername}
                              width="200"/>
                </HStack>

                <HStack marginTop={5}>
                    <Text fontSize={18}>昵称:</Text>
                    <InputBox input_text={name} place_holder={"name"} onChangeSubject={handleChangeName}
                              width="200"/>
                </HStack>

                <HStack marginTop={5}>
                    <Text fontSize={18}>密码:</Text>
                    <InputBox input_text={password} place_holder={"password"} onChangeSubject={handleChangePassword}
                              width="200"/>
                </HStack>

                <HStack marginTop={5}>
                    <Text fontSize={18}>性别:</Text>
                    <InputBox input_text={gender} place_holder={"gender"} onChangeSubject={handleChangeGender}
                              width="200"/>
                </HStack>

                <HStack marginTop={5}>
                    <Text fontSize={18}>专业:</Text>
                    <InputBox input_text={major} place_holder={"major"} onChangeSubject={handleChangeMajor}
                              width="200"/>
                </HStack>

                <HStack marginTop={5}>
                    <Text fontSize={18}>邮箱:</Text>
                    <InputBox input_text={email} place_holder={"email"} onChangeSubject={handleChangeEmail}
                              width="200"/>
                </HStack>

                <HStack marginTop={5}>
                    <Text fontSize={18}>邮箱密码:</Text>
                    <InputBox input_text={email_password} place_holder={"email_password"}
                              onChangeSubject={handleChangeEmailPassword} width="200"/>
                </HStack>
                <HStack>
                    <Button width={100} marginTop={5} onPress={() => {
                        formData.append("id", id)
                        formData.append("username", username)
                        formData.append("name", name)
                        formData.append("password", password)
                        formData.append("gender", gender)
                        formData.append("major", major)
                        formData.append("email", email)
                        formData.append("email_password", email_password)
                        let temp: string = "";
                        axios.post(link_route + '/register', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(response => {
                            temp = response.data['state']
                            setWarning(response.data['state'])
                            if (response.data['state'] === 'succeed') {
                                nav.navigate("Login")
                            }
                            // console.log('Login succeeded:');
                        }).catch(error => {
                            console.error('Login failed:', error);
                        })


                    }}>Register</Button>
                    <Button width={100} marginTop={5} marginLeft={5}
                            onPress={() => {
                                nav.navigate("Login")
                            }}
                    >Back</Button>
                </HStack>
            </VStack>
            </View>
        </ScrollView>
    )

}

export default SignupScreen;
