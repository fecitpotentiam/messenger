import React from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import { Container } from 'native-base'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import store from './messenger/store/store'
import { Provider } from 'react-redux'
import NavigationService from './messenger/utils/navigator'


import Example from "./messenger/pages/example"
import Login from "./messenger/pages/login"
import Register from "./messenger/pages/register"
import Chats from "./messenger/pages/chats"
import Chat from "./messenger/pages/chat"
import CreateChat from './messenger/pages/create_chat'
import ImagePickerComponent from './messenger/pages/imagePicker'




const MainNavigator = createStackNavigator({
  Home: {screen: Login, navigationOptions: {header: null}},
  // Home: {screen: Chat},
  Register: {screen: Register},
  Chats: {screen: Chats, navigationOptions: {header: null}},
  Chat: {screen: Chat, navigationOptions: {header: null}},
  CreateChat: {screen: CreateChat},
  ImagePickerMobile: {screen: ImagePickerComponent}
});

const Navigation = createAppContainer(MainNavigator);

class App extends React.PureComponent {

  render() {
    return (
      <Provider store={store}>
        {/* <RouterComponent />
        <Navigation /> */}
        <Navigation
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </Provider>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',

  },
});

export default App;
