import AnimatedColorBox from "../components/animated-color-box";
import {Box, Button, Heading, HStack, IconButton, Image, Input, useColorModeValue, VStack} from "native-base";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {NativeSyntheticEvent, TextInputChangeEventData} from "react-native";
import {useNavigation} from "@react-navigation/native";
import InputBox from "../components/input-box";
import {Feather} from "@expo/vector-icons";
import {serverLink} from "../utils/ServerLink";
import axios from "axios";
import {View, ScrollView, StyleSheet} from 'react-native';
import {
    setSharedId,
    setSharedName,
    setSharedEmail,
    setSharedGender,
    setSharedMajor,
    setSharedUsername,
    getShareId, setSharedPassword, setSharedEmailPassword
} from "../components/DataContext";
import {Text} from "native-base";
const LoginScreen = () => {

    const link_route = serverLink;
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeName = useCallback(name => {
        setName(name)
    }, [])
    const handleChangePassword = useCallback(password => {
        setPassword(password)
    }, [])
    const handleChangePasswordSubject = useCallback(
        (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
            handleChangePassword && handleChangePassword(e.nativeEvent.text)
        },
        [handleChangePassword]
    )
    const formData = new FormData();
    const nav = useNavigation();
    const [warning, setWarning] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false)
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
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
                            {"Welcom to the app"}
                        </Heading>
                    </VStack>
                    <HStack>
                        <VStack w="full" h="110px" alignItems="center" alignContent="center" p={4}>
                            <Box marginBottom={2} alignItems={"center"}>
                                <Text fontSize={15} color={success?"green.600":"orange.500"}>{warning}</Text>
                            </Box>
                            <InputBox
                                input_text={name}
                                place_holder="id"
                                onChangeSubject={handleChangeName}
                                width="200"/>
                            <Box marginLeft={2}
                                 marginTop={5}
                                 bg={"white"}
                                 height="40px"
                                 borderTopLeftRadius="20px"
                                 borderTopRightRadius="20px"
                                 borderBottomLeftRadius="20px"
                                 borderBottomRightRadius="20px">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    width="200"
                                    borderTopLeftRadius="20px"
                                    borderTopRightRadius="20px"
                                    borderBottomLeftRadius="20px"
                                    borderBottomRightRadius="20px"
                                    height="40px"
                                    fontSize={17}
                                    placeholder="Password"
                                    onChange={handleChangePasswordSubject}
                                    value={password}
                                />
                            </Box>
                            <IconButton
                                onPress={togglePasswordVisibility}
                                borderRadius={50}
                                _icon={{
                                    as: Feather,
                                    name: 'eye',
                                    size: 6,
                                    color: 'gray'
                                }}
                            />
                            <HStack marginTop={2}>
                                <Button marginLeft={5}
                                        width={100}
                                        onPress={() => {
                                            formData.append("id", name);
                                            formData.append("password", password);
                                            axios.post(link_route + '/login', formData, {
                                                headers: {
                                                    'Content-Type': 'multipart/form-data'
                                                }
                                            }).then(response => {
                                                setWarning(response.data['state'])
                                                if (response.data['state'] === 'succeed') {
                                                    setSuccess(true)
                                                    setSharedUsername(response.data["username"]);
                                                    setSharedName(response.data['name']);
                                                    setSharedGender(response.data['gender']);
                                                    setSharedMajor(response.data['major']);
                                                    setSharedEmail(response.data['email'])
                                                    setSharedPassword(response.data['password'])
                                                    setSharedId(response.data['id'].toString())
                                                    setSharedEmailPassword(response.data['email_password'])
                                                    nav.navigate("Main")
                                                }else {
                                                    setSuccess(false)
                                                }
                                            }).catch(error => {
                                                console.error('Login failed:', error);
                                            })
                                        }
                                        }
                                >
                                    LogIn
                                </Button>
                                <Button marginLeft={10}
                                        width={100}
                                        onPress={() => {
                                            nav.navigate("Signup");
                                        }}>
                                    Register
                                </Button>

                            </HStack>
                            <Button marginTop={5}
                                    height={10}
                                    marginLeft={10}
                                    bgColor={"green.500"}
                                    onPress={() => {
                                        nav.navigate("LoginWithEmail");
                                    }}>
                                Login with email
                            </Button>
                        </VStack>

                    </HStack>

                </Box>
            </View>
        </ScrollView>
    )

}

export default LoginScreen;
