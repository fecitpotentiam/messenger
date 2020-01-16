import React, { Component } from 'react'
import {StyleSheet} from "react-native"

import { Container, Button, Content, Item, Input, Text } from 'native-base'
import { connect } from 'react-redux'
import { prepareRegister } from '../store/actions/register'
import { registerThunk } from '../store/thunks/register'


class Register extends Component {

  state = {
    name: '',
    username: '',
    email: '',
    password: ''
  }

  register = () => {
    this.props.register(this.state.name,
                        this.state.username,
                        this.state.email,
                        this.state.password)
  }


  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={styles.container}
        >
          <Item style={styles.input}>
            <Input placeholder='Name'
              onChangeText={t => this.setState({name: t})}
            />
          </Item>

          <Item style={styles.input}>
            <Input placeholder='Username'
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={t => this.setState({username: t})}
            />
          </Item>

          <Item style={styles.input}>
            <Input placeholder='Email'
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={t => this.setState({email: t})}
            />
          </Item>

          <Item style={styles.input}>
            <Input placeholder='Password'
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true} 
              onChangeText={t => this.setState({password: t})}
            />
          </Item>


          <Button style={[styles.button]} onPress={this.register}>
            <Text>Register</Text>
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
  loading: state.register.loading,
  error: state.register.error
})


const dispatchMap = dispatch => ({
  register: (name, username, email, password) => {
    dispatch(prepareRegister({name, username, email, password}))
    dispatch(registerThunk(name, username, email, password))
  }
})


export default connect(stateMap, dispatchMap)(Register)