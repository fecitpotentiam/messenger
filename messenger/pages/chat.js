import React, { Component, PureComponent } from "react";
import { FlatList } from "react-native";
import {
  Container,
  Header,
  Content,
  Input,
  Left,
  Right,
  Form,
  Item,
  Icon,
  Button,
  Text,
  Row,
  View,
  ListItem,
} from "native-base";
import {StyleSheet, KeyboardAvoidingView} from "react-native"
import * as Permissions from 'expo-permissions'
import Message from '../components/message'
import {connect} from 'react-redux'
import {chatName} from '../utils/chats'
import {chatChannels} from '../utils/channels/socket'


class Chat extends PureComponent {
  state = {
    messageText: ''
  }

  goToImagePicker = async () => {
    let {navigate} = this.props.navigation
    if (await Permissions.askAsync(Permissions.CAMERA)) {
      navigate('ImagePickerMobile')
    }
  }


  goBack = () => {
    this.props.navigation.pop()
  }

  addOutMessage = () => {
    let {chat} = this.props

    chatChannels[chat.id].push('message', {content: {text: this.state.messageText}, id: null})

    this.setState({
      messageText: ''
    })
  }

  loadMore = () => {
    let chat = this.props.chat
    chatChannels[chat.id].push('load_messages_before', {message_id: chat.order[0]})
  }

  render() {

    let {messages, chat} = this.props

    return (
      <Container style={styles.container}>
        <Header style={{width: '100%'}}>
          <Left>
            <Button transparent icon style={{marginLeft: 5, marginTop: -10}} onPress={this.goBack}>
              <Icon name="ios-arrow-back" style={{fontSize: 40}} />
            </Button>
          </Left>
          <Text style={styles.headerText}>
            {chatName(chat)}
          </Text>
          <Right></Right>
        </Header>

        <FlatList
          inverted
          data={messages}
          renderItem={({item}) => (
            <Message message={item} />
          )}
          keyExtractor={item => {
            return item.id.toString()
          }}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd < 100) {
              this.loadMore()
            }
          }}
        />

        <KeyboardAvoidingView
          behavior="padding"
          // keyboardVerticalOffset={64}
        >
          <View style={{...styles.messageForm, bottom: -10}}>
            <View style={{flexDirection: 'row'}}>
              <Button
                rounded
                icon
                transparent
                onPress={this.goToImagePicker}
                style={{marginRight: -10}}
              >
                <Icon name='image' style={{fontSize: 35}} />
              </Button>
              <Item rounded style={{flex: 1, height: 45, bottom: -3}}>
                <Input style={{flex: 1}}
                       refs={'myInput'}
                       placeholder= 'Type...'
                       value={this.state.messageText}
                       onChangeText={t => this.setState({messageText: t})}
                />
              </Item>
              <Button
                icon
                transparent
                style={{
                  transform: [{rotate: '44deg'}]
                }}
                onPress={this.addOutMessage}
              >
                <Icon name='send' style={{fontSize: 38}} />
              </Button>
            </View>
        </View>
        </KeyboardAvoidingView>
        {/*</KeyboardAvoidingView>*/}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    // justifyContent: 'center',
    flex: 1,
    // width: '100%',
  },


  textField: {
    // position: 'absolute',
    // bottom:0

  },

  sendControlContainerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },

  input:{
    // paddingHorizontal: 170
    width: '80%',
    marginTop: 5
  },

  button: {
    width: '80%',
    marginTop: 20,
    justifyContent: 'center',
  },
  back: {
    marginTop: 10,
  },

  messageForm: {
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginTop: -7
  },

  headerText: {
    fontWeight: '600',
    fontSize: 20,
    marginTop: 8
  },

  incomingMessageText:
    {
      alignSelf: 'flex-start',
      marginTop: 10,
      fontSize: 18,
      marginLeft: 2
    },
  outMessageText:
    {
      backgroundColor: 'green',
      alignSelf: 'flex-end',
      marginTop: 10,
      fontSize: 18,
      marginRight: 2
    }
});


const stateMap = state => {
  return {
    messages: state.chats.chats.get(state.chats.chatId).order.map(i => state.messages[i]).reverse(),
    chat: state.chats.chats.get(state.chats.chatId)
  }
}

export default connect(stateMap)(Chat)
