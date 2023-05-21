import AnimatedColorBox from "../components/animated-color-box";
import {Box, Button, Heading, HStack, IconButton, Image, Input, useColorModeValue, VStack} from "native-base";
import React, {useCallback, useEffect, useState} from "react";
import {NativeSyntheticEvent, TextInputChangeEventData} from "react-native";
import {useNavigation} from "@react-navigation/native";
import InputBox from "../components/input-box";
import {Feather} from "@expo/vector-icons";
import {serverLink} from "../utils/ServerLink";
import axios from "axios";
import {View, ScrollView, StyleSheet} from 'react-native';
import {
    setSharedEmail, setSharedEmailPassword,
    setSharedGender, setSharedId,
    setSharedMajor,
    setSharedName,
    setSharedUsername
} from "../components/DataContext";

const LoginWithEmailScreen = () => {
    const link_route = serverLink;
    const [email, setEmail] = useState("");
    const [VerifyCode, setVerifyCode] = useState("");

    const handleChangeEmail = useCallback(email => {
        setEmail(email)
    }, [])
    const handleChangeVerifyCode = useCallback(VerifyCode => {
        setVerifyCode(VerifyCode)
    }, [])
    const handleChangeVerifyCodeSubject = useCallback(
        (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
            handleChangeVerifyCode && handleChangeVerifyCode(e.nativeEvent.text)
        },
        [handleChangeVerifyCode]
    )
    const formData = new FormData();
    const nav = useNavigation();
    const [warning, setWarning] = useState("");


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
        },
        contentContainer: {
            paddingBottom: 500, // 设置底部填充
        },
    });
    useEffect(() => {
        setWarning(warning)
    }, [warning]);

    // @ts-ignore
    return (
        <ScrollView>
            <View style={styles.contentContainer}>
                <Box
                    flex={1}
                    w="full"
                >
                    <VStack h="300px" pb={5}>
                        <Image
                            position="absolute"
                            left={0}
                            right={0}
                            bottom={0}
                            w="full"
                            h="300px"
                            resizeMode="cover"
                            source={require('../assets/login.jpg')}
                            alt="masthead image"
                        />
                        <Box flex={1}/>
                        <Heading color="white" p={6} size="xl">
                            {"Login with Email"}
                        </Heading>
                    </VStack>
                    <HStack>
                        <VStack w="full" h="110px" alignItems="center" alignContent="center" p={4}>
                            <Box bg={"orange.300"} marginBottom={2} alignItems={"center"}>{warning}</Box>
                            <InputBox
                                input_text={email}
                                place_holder="邮箱地址"
                                onChangeSubject={handleChangeEmail}
                                width="250"/>
                            <Box marginLeft={2}
                                 marginTop={5}
                                 height="40px"
                                 borderTopLeftRadius="20px"
                                 borderTopRightRadius="20px"
                                 borderBottomLeftRadius="20px"
                                 borderBottomRightRadius="20px">
                                <HStack>
                                    <Input
                                        bgColor={"white"}
                                        type="text"
                                        width="150"
                                        borderTopLeftRadius="20px"
                                        borderTopRightRadius="20px"
                                        borderBottomLeftRadius="20px"
                                        borderBottomRightRadius="20px"
                                        height="40px"
                                        fontSize={17}
                                        placeholder="验证码"
                                        onChange={handleChangeVerifyCodeSubject}
                                        value={VerifyCode}
                                    />
                                    <Button marginLeft={5}
                                            width={70}
                                            bgColor={"green.500"}
                                            onPress={() => {
                                                const formData1 = new FormData();
                                                formData1.append('email_address', email);
                                                axios.post(link_route + '/login_by_email', formData1, {
                                                    headers: {
                                                        'Content-Type': 'multipart/form-data'
                                                    }
                                                }).then(response => {
                                                    setWarning(response.data['state'])
                                                }).catch(error => {
                                                    console.error('Login failed:', error);
                                                })
                                            }}
                                    >获取
                                    </Button>
                                </HStack>
                            </Box>

                            <HStack>
                                <Button marginLeft={5}
                                        marginTop={5}
                                        width={100}
                                        onPress={() => {
                                            formData.append("email_address", email);
                                            formData.append("verify_code", VerifyCode);
                                            axios.post(link_route + '/login_by_verify_code', formData, {
                                                headers: {
                                                    'Content-Type': 'multipart/form-data'
                                                }
                                            }).then(response => {
                                                setWarning(response.data['state'])
                                                if (response.data['state'] === 'succeed') {
                                                    setSharedUsername(response.data["username"]);
                                                    setSharedName(response.data['name']);
                                                    setSharedGender(response.data['gender']);
                                                    setSharedMajor(response.data['major']);
                                                    setSharedEmail(response.data['email'])
                                                    setSharedId(response.data['id'].toString())
                                                    setSharedEmailPassword(response.data['email_password'])
                                                    nav.navigate("Main")
                                                }
                                            }).catch(error => {
                                                console.error('Login failed:', error);
                                            })
                                        }
                                        }
                                >
                                    LogIn
                                </Button>
                                <Button marginLeft={5} marginTop={5} height={10} width={100}
                                        onPress={() => {
                                            nav.navigate("Login")
                                        }}
                                >Back</Button>
                            </HStack>
                        </VStack>

                    </HStack>

                </Box>
            </View>
        </ScrollView>
    )

}

export default LoginWithEmailScreen;
