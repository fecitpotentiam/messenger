import React, {PureComponent} from 'react'
import {StyleSheet, Image} from 'react-native'
import {
  Text,
  View
} from 'native-base'
import {connect} from 'react-redux'


class Message extends PureComponent {
  render() {
    let {message, userId} = this.props

    let style, textStyle

    switch (message.type) {
      case "message":
        style = message.author === userId ? styles.outgoingMessage : styles.incomingMessage
        textStyle = message.author === userId ? styles.outgoingMessageText : styles.incomingMessageText

        return (
          <View style={style}>
            <Text style={textStyle}>{message.content.text}</Text>
          </View>
        )

      case "image":
        style = message.author === userId ? styles.outgoingImage : styles.incomingImage

        return (
          <View style={style}>
            <Image style={styles.image} source={{uri: message.content.url}} />
            {/*<Text style={textStyle}>{message.content.url}</Text>*/}
          </View>
        )

      case "info":
        return (
          <Text style={styles.infoMessage}>
            Chat created
          </Text>
        )

      default:
        return null;
    }
  }
}

const styles = StyleSheet.create({
  incomingMessage: {
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    backgroundColor: '#e6e6e6',
    padding: 10,
    borderRadius: 20,
    maxWidth: '80%'
  },
  incomingImage: {
    alignSelf: 'flex-start',
    maxWidth: '80%',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 20,
  },
  outgoingImage: {
    alignSelf: 'flex-end',
    maxWidth: '80%',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    borderRadius: 20,
  },
  incomingMessageText: {
    color: '#000000'
  },
  image: {
    minWidth: '100%',
    maxWidth: '100%',
    height: '100%',
    borderRadius: 20
  },
  outgoingMessage: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    backgroundColor: '#4851da',
    padding: 10,
    borderRadius: 20,
    maxWidth: '80%'
  },
  outgoingMessageText: {
    color: '#ffffff'
  },
  infoMessage: {
    color: '#838383',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15
  }
})


const stateMap = state => ({
  userId: state.auth.userId
})

export default connect(stateMap)(Message)

