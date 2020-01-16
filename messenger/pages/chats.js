import React, { Component } from 'react'
import { FlatList } from 'react-native'
import {
  Container,
  Header,
  Content,
  List,
  Button,
  ListItem,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Thumbnail,
  Text,
} from 'native-base'
import ChatPreview from '../components/chat_preview'
import { connect } from 'react-redux'
import {selectChat} from '../store/actions/chats'
import {logout} from '../store/actions/auth'
import {chatChannels, socket, clearChannels, userChannel} from '../utils/channels/socket'


class Chats extends Component {

  static navigationOptions = { 
    header: null,
    title: 'Chats'
  }

  goToChat = (chatId) => {
    this.props.selectChat(chatId)
    let {navigate} = this.props.navigation
    navigate('Chat')
  }

  goToChatCreate = () => {
    let {navigate} = this.props.navigation
    navigate('CreateChat')
  }

  exitFromAccount = async () => {
    this.props.logout()
    let {navigate} = this.props.navigation
    await clearChannels()
    navigate('Home')
  }

  loadMore = () => {
    userChannel.push('load_chats', {offset: this.props.chats.length})
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent icon rounded onPress={this.exitFromAccount}>
              <Icon name="exit" style={{fontSize: 50, marginTop: -10}} />
            </Button>
          </Left>
          <Text style={{marginTop: 8, fontSize: 20}}> Chats </Text>
          <Right>
            <Button transparent icon rounded onPress={this.goToChatCreate}>
              <Icon name="add" style={{fontSize: 50, marginTop: -10}} />
            </Button>
          </Right>
        </Header>
        <FlatList
          data={this.props.chats}
          renderItem={({item}) => <ChatPreview key={item.id} onTap={() => this.goToChat(item.id)} chat={item}/>}
          keyExtractor={(chat) => chat.id.toString()}
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false }}
          onEndReached={({ distanceFromEnd }) => {
            this.loadMore()
          }}
        />
      </Container>
    )
  }
}


const stateMap = state => {
  return {
    chats: state.chats.order.map(i => state.chats.chats.get(i))
  }
}


const dispatchMap = dispatch => ({
  selectChat: (chatId) => {
    dispatch(selectChat(chatId))
  },
  logout: () => {
    dispatch(logout())

  }
})


export default connect(stateMap, dispatchMap)(Chats)
