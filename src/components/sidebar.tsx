import React, { useCallback, useContext } from 'react';
import {
    HStack,
    VStack,
    Center,
    Avatar,
    Heading,
    IconButton,
    useColorModeValue
} from 'native-base';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import AnimatedColorBox from './animated-color-box';
import ThemeToggle from './theme-toggle';
import { Feather } from '@expo/vector-icons';
import MenuButton from './menu-button';
import { getSharedName } from './DataContext';
import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

const Sidebar = (props: DrawerContentComponentProps) => {
    const { state, navigation } = props;
    const currentRoute = state.routeNames[state.index];

    const handlePressBackButton = useCallback(() => {
        navigation.closeDrawer();
    }, [navigation]);
    const handlePressMenuMain = useCallback(() => {
        navigation.navigate('Main');
    }, [navigation]);
    const handlePressMenuAbout = useCallback(() => {
        navigation.navigate('About');
    }, [navigation]);
    const handlePressCommentSection = useCallback(() => {
        navigation.navigate('Comment');
    }, [navigation]);
    const handlePressEmailPage = useCallback(() => {
        navigation.navigate('Email');
    }, [navigation]);
    const handlePressChatScreen = useCallback(() => {
        navigation.navigate('ChatScreen');
    }, [navigation]);

    const name = getSharedName();

    const isSwipeDisabled =
        currentRoute === 'Login' ||
        currentRoute === 'SignUp' ||
        currentRoute === 'LoginWithEmail';

    const borderColor = useColorModeValue('blue.300', 'darkBlue.700');
    const color = useColorModeValue('blue.800', 'darkBlue.700');

    if (isSwipeDisabled) {
        // 如果需要禁用滑动打开侧边栏功能，返回一个没有滑动手势的视图
        return (
            <AnimatedColorBox safeArea flex={1} bg={useColorModeValue('blue.50', 'darkBlue.800')} p={7}>
                <VStack flex={1} space={0} backgroundColor="white">
                    <IconButton
                        marginLeft={10}
                        marginTop={50}
                        width={50}
                        onPress={handlePressBackButton}
                        borderRadius={100}
                        variant="outline"
                        borderColor={borderColor}
                        _icon={{
                            as: Feather,
                            name: 'chevron-left',
                            size: 6,
                            color: color
                        }}
                    />
                    <Heading color="black" p={6} size="sm" marginTop={1}>
                        Enjoy your Journey in "Everything is Scheduled"
                    </Heading>
                </VStack>
            </AnimatedColorBox>
        );
    } else {
        return (
            <AnimatedColorBox safeArea flex={1} bg={useColorModeValue('blue.50', 'darkBlue.800')} p={7}>
                <VStack flex={1} space={2}>
                    <HStack justifyContent="flex-end">
                        <IconButton
                            onPress={handlePressBackButton}
                            borderRadius={100}
                            variant="outline"
                            borderColor={borderColor}
                            _icon={{
                                as: Feather,
                                name: 'chevron-left',
                                size: 6,
                                color: color
                            }}
                        />
                    </HStack>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Setting");
                    }}>
                        <VStack>
                            <Text marginLeft={7}>Setting</Text>
                            <Avatar
                                source={require('../assets/profile-image.png')}
                                size="xl"
                                borderRadius={100}
                                mb={6}
                                borderColor="secondary.500"
                                borderWidth={3}
                            />
                        </VStack>
                    </TouchableOpacity>
                    <HStack>
                        <Heading mb={4} size="xl">
                            {name}
                        </Heading>
                        <IconButton
                            marginLeft={1}
                            width="50px"
                            height="50px"
                            onPress={() => {
                                navigation.navigate("Login");
                            }}
                            borderRadius={100}
                            variant="outline"
                            borderColor={useColorModeValue('blue.50', 'darkBlue.800')}
                            _icon={{
                                as: Feather,
                                name: 'log-out',
                                size: 5,
                                color: color
                            }}
                        />
                    </HStack>
                    <MenuButton
                        active={currentRoute === 'Main'}
                        onPress={handlePressMenuMain}
                        icon="star"
                    >
                        Tasks
                    </MenuButton>
                    <MenuButton
                        active={currentRoute === 'About'}
                        onPress={handlePressMenuAbout}
                        icon="info"
                    >
                        Course Planning
                    </MenuButton>
                    <MenuButton
                        active={currentRoute === 'Comment'}
                        onPress={handlePressCommentSection}
                        icon="users"
                    >
                        Comment
                    </MenuButton>
                    <MenuButton
                        active={currentRoute === 'Email'}
                        onPress={handlePressEmailPage}
                        icon="mail"
                    >
                        Email
                    </MenuButton>
                    <MenuButton
                        active={currentRoute === 'ChatScreen'}
                        onPress={handlePressChatScreen}
                        icon="message-square"
                    >
                        AI Chat
                    </MenuButton>
                </VStack>
                <Center>
                    <ThemeToggle />
                </Center>
            </AnimatedColorBox>
        );
    }
};

export default Sidebar;
