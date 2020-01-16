import React, { Component } from 'react'
import {StyleSheet} from "react-native"

import { Container, Button, Content, Item, Input, Text } from 'native-base'
import {userChannel} from '../utils/channels/socket'
import {prepareCreating} from '../store/actions/createChat'


import {loginThunk} from '../store/thunks/login'
import {connect} from 'react-redux'


class CreateChat extends Component {
  state = {
    username: ''
  }

  createChat = () => {
    this.props.createChat()
    userChannel.push("create_dialog", {username: this.state.username})
  }

  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={styles.container}
        >

          {
            this.props.loading ?
              <Item>
                <Text>Loading...</Text>
              </Item>:
              null
          }
          {
            this.props.error ?
              <Item>
                <Text>Error!</Text>
              </Item>:
              null
          }


          <Item style={styles.input}>
            <Input
              placeholder='Username'
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={t => this.setState({username: t})}
            />
          </Item>

          <Button style={styles.button} onPress={this.createChat}>
            <Text>Start chat</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  input:{
    // paddingHorizontal: 170
    width: '80%',
    marginTop: 5
  },

  button: {
    width: '80%',
    marginTop: 30,
    justifyContent: 'center',
  },
  back: {
    marginTop: 10,
  },

});

const stateMap = state => ({
  loading: state.createChat.loading,
  error: state.createChat.error
})


const dispatchMap = dispatch => ({
  createChat: (username) => {
    dispatch(prepareCreating())
  }
})

export default connect(stateMap, dispatchMap)(CreateChat)
