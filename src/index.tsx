import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MainScreen from './screens/main-screen'
import AboutScreen from './screens/about-screen'
import Sidebar from './components/sidebar'
import CommentSection from './screens/comment-section'
const Drawer = createDrawerNavigator()
import { NavigationContainer } from '@react-navigation/native'
import CommentPage from './screens/comment-page'

const App = () => {
  return (
    <Drawer.Navigator
        initialRouteName="Main"
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
      </Drawer.Navigator>
  )
}

export default App
