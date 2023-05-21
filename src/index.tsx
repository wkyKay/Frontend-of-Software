import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MainScreen from './screens/main-screen'
import AboutScreen from './screens/about-screen'
import Sidebar from './components/sidebar'
import CommentSection from './screens/comment-section'
import LoginScreen from "./screens/login-screen";
const Drawer = createDrawerNavigator()
import CommentPage from './screens/comment-page'
import EmailScreen from './screens/mail'
import SignupScreen from "./screens/signup-screen";
import LoginWithEmailScreen from "./screens/login-email-screen";
import SettingScreen from "./screens/setting-screen";

const App = () => {
  return (
    <Drawer.Navigator
        initialRouteName="Login"
        drawerContent={props => <Sidebar {...props} />}
        screenOptions={{
          //headershown可以控制上边界的显示
          headerShown: false,
          drawerType: 'back',
          overlayColor: '#00000000'
        }}
      >
        <Drawer.Screen name="Main" component={MainScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name='Comment' component={CommentSection}/>
        <Drawer.Screen name='CommentPage' component={CommentPage}/>
        <Drawer.Screen name='Email' component={EmailScreen}/>
        <Drawer.Screen name='Login' component={LoginScreen}/>
        <Drawer.Screen name='Signup' component={SignupScreen}/>
        <Drawer.Screen name='LoginWithEmail' component={LoginWithEmailScreen}/>
        <Drawer.Screen name='Setting' component={SettingScreen}/>

      </Drawer.Navigator>
  )
}

export default App
