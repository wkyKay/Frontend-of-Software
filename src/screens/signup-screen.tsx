import AnimatedColorBox from "../components/animated-color-box";
import {Box, Button, Heading, HStack, Input, useColorModeValue, VStack} from "native-base";
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
            paddingBottom: 900, // 设置底部填充
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

    const [warning1, setWarning1] = useState("");

    useEffect(() => {
        setWarning1(warning1)
    }, [warning1]);

    const [send, setSend] = useState(false);

    return (
        <ScrollView>
            <View style={styles.contentContainer}>


            <VStack w="full" h="110px" marginTop={20} marginLeft={15} alignItems="left" alignContent="left" p={4}>
                <Heading color="black" p={6} size="lg" marginTop={-5}>
                    注册账号
                </Heading>
                <Box marginBottom={2} alignItems={"center"} >
                    <Text color={"orange.500"}>{warning}</Text></Box>

                <Box
                borderBottomWidth={1}
                borderBottomColor={"black"}>
                <HStack>
                    <Text fontSize={18}>学号:</Text>
                    <Input fontSize={15} placeholder={"id"} borderColor={"warmGray.50"} width={200} onChange={handleChangeId}></Input>

                    {/*<InputBox input_text={id} place_holder={"id"} onChangeSubject={handleChangeId} width="200"/>*/}
                </HStack>
                </Box>

                <Box
                    borderBottomWidth={1}
                    borderBottomColor={"black"}>
                <HStack marginTop={5}>
                    <Text fontSize={18}>真实姓名:</Text>
                    <Input fontSize={15} placeholder={"username"} borderColor={"warmGray.50"} width={160} onChange={handleChangeUsername}></Input>

                    {/*<InputBox input_text={username} place_holder={"username"} onChangeSubject={handleChangeUsername}*/}
                    {/*          width="200"/>*/}
                </HStack>
                </Box>

                <Box
                    borderBottomWidth={1}
                    borderBottomColor={"black"}>
                <HStack marginTop={5}>
                    <Text fontSize={18}>昵称:</Text>
                    {/*<InputBox input_text={name} place_holder={"name"} onChangeSubject={handleChangeName}*/}
                    {/*          width="200"/>*/}
                    <Input fontSize={15} placeholder={"name"} borderColor={"warmGray.50"} width={200} onChange={handleChangeName}></Input>

                </HStack>
                </Box>

                <Box
                    borderBottomWidth={1}
                    borderBottomColor={"black"}>
                <HStack marginTop={5}>
                    <Text fontSize={18}>密码:</Text>
                    <Input fontSize={15} placeholder={"password"} borderColor={"warmGray.50"} width={200} onChange={handleChangePassword}></Input>
                    {/*<InputBox input_text={password} place_holder={"password"} onChangeSubject={handleChangePassword}*/}
                    {/*          width="200"/>*/}
                </HStack>
                </Box>

                <Box
                    borderBottomWidth={1}
                    borderBottomColor={"black"}>
                <HStack marginTop={5}>
                    <Text fontSize={18}>性别:</Text>
                    {/*<InputBox input_text={gender} place_holder={"gender"} onChangeSubject={handleChangeGender}*/}
                    {/*          width="200"/>*/}
                    <Input fontSize={15} placeholder={"gender"} borderColor={"warmGray.50"} width={200} onChange={handleChangeGender}></Input>
                </HStack>
                </Box>

                <Box
                    borderBottomWidth={1}
                    borderBottomColor={"black"}>
                <HStack marginTop={5}>
                    <Text fontSize={18}>专业:</Text>
                    {/*<InputBox input_text={major} place_holder={"major"} onChangeSubject={handleChangeMajor}*/}
                    {/*          width="200"/>*/}
                    <Input fontSize={15} placeholder={"major"} borderColor={"warmGray.50"} width={200} onChange={handleChangeMajor}></Input>
                </HStack>
                </Box>

                <Box
                    borderBottomWidth={1}
                    borderBottomColor={"black"}>
                <HStack marginTop={5} marginBottom={2}>
                    <Text fontSize={18}>邮箱:</Text>
                    {/*<InputBox input_text={email} place_holder={"email"} onChangeSubject={handleChangeEmail}*/}
                    {/*          width="200"/>*/}
                    <Input fontSize={15} placeholder={"email"} borderColor={"warmGray.50"} width={200} onChange={handleChangeEmail}></Input>
                </HStack>
                </Box>

                <Box
                    borderBottomWidth={1}
                    borderBottomColor={"black"}>
                <Box alignItems={"center"} >
                    <Text color={send?"green.600":"orange.600"}>{warning1}</Text></Box>
                <HStack >
                    <Text fontSize={18}>邮箱验证码:</Text>
                    {/*<InputBox input_text={email_password} place_holder={"验证码"}*/}
                    {/*          onChangeSubject={handleChangeEmailPassword} width="150"/>*/}
                    <Input fontSize={15} placeholder={"验证码"} borderColor={"warmGray.50"} width={100} onChange={handleChangeEmailPassword}></Input>
                    <Button marginLeft={3}
                            color={"green.700"}
                            width={70}
                            onPress={() => {
                                setWarning1("waiting...")
                                const formData1 = new FormData();
                                formData1.append('email_address', email);
                                axios.post(link_route + '/register_by_email', formData1, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                }).then(response => {
                                    if(response.data['state'] === 'succeed'){
                                        setSend(true);
                                    }
                                    setWarning1(response.data['state'])
                                }).catch(error => {
                                    console.error('Login failed:', error);
                                })
                            }}
                    >获取
                    </Button>
                </HStack>
                </Box>
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
