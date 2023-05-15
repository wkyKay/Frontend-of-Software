import AnimatedColorBox from "../components/animated-color-box";
import {Box, Button, Heading, HStack, IconButton, Image, Input, useColorModeValue, VStack} from "native-base";
import React, {useCallback, useEffect, useState} from "react";
import {NativeSyntheticEvent, TextInputChangeEventData} from "react-native";
import {useNavigation} from "@react-navigation/native";
import InputBox from "../components/input-box";
import {Feather} from "@expo/vector-icons";
import {serverLink} from "../utils/ServerLink";
import axios from "axios";
import NavBar from "../components/navbar";
import Masthead from "../components/masthead";

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

    useEffect(() => {
        setWarning(warning)
    }, [warning]);

    return (
        <Box
            bg={useColorModeValue('warmGray.50', 'primary.900')}
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
                    <Box bg={"orange.300"} marginBottom={2} alignItems={"center"}>{warning}</Box>
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
                            type="password"
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
                        // onPress={handlePressMenuButton}
                        borderRadius={50}
                        _icon={{
                            as: Feather,
                            name: 'eye',
                            size: 6,
                            color: 'gray'
                        }}
                    />
                    <HStack marginTop={5}>
                        <Button marginLeft={5}
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
                        <Button marginLeft={10}
                                onPress={() => {
                                    nav.navigate("Signup");
                                }}>
                            SignUp
                        </Button>
                    </HStack>
                </VStack>

            </HStack>

        </Box>
    )

}

export default LoginScreen;
