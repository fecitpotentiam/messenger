import React, { PureComponent } from 'react'
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base'
import { chatName } from '../utils/chats'
import {connect} from 'react-redux'


class ChatPreview extends PureComponent {

  messageText = () => {
    let lastMessage = this.props.messages[this.props.chat.last_message]
    switch (lastMessage.type) {
      case "message":
        return lastMessage.content.text
      case "image":
        return "Picture"
      case "info":
        return "Chat created"
      default:
        return "Unsupported message type"
    }
  }

  messageTime = () => {
    let messageDatetime = ""

    let now = Date.now()
    let msgCreated = new Date(this.props.messages[this.props.chat.last_message].created_at)

    let diff = (now - msgCreated) / (1000 * 60 * 60 * 24)

    if (diff > 360)
      messageDatetime += msgCreated.getFullYear().toString() + "."

    if (diff > 1)
      messageDatetime += `${msgCreated.getMonth()}.${msgCreated.getDay()} `

    messageDatetime += `${msgCreated.getHours()}:${msgCreated.getMinutes()}:${msgCreated.getSeconds()}`

    return messageDatetime

  }

  render() {
    let {chat} = this.props
    let name = chatName(chat)

    return (
      <ListItem onPress={this.props.onTap}>
        {/*<Left>*/}
        {/*  <Thumbnail source={{ uri: 'Image URL' }} />*/}
        {/*</Left>*/}
        <Body>
          <Text>{name}</Text>
          <Text numberOfLines={1} note>{this.messageText()}</Text>
        </Body>
        <Right>
          <Text note>{this.messageTime()}</Text>
        </Right>
      </ListItem>
    )
  }
}


const stateMap = state => ({
  messages: state.messages
})


export default connect(stateMap)(ChatPreview)
