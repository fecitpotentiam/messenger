import React, { Component } from 'react'
import {StyleSheet} from "react-native"

import { Container, Button, Content, Item, Input, Text } from 'native-base'
import { connect } from 'react-redux'
import { prepareLogin } from '../store/actions/login'
import { loginThunk } from '../store/thunks/login'


class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  goToRegister = () => {
    let {navigate} = this.props.navigation
    navigate('Register')
  }

  login = () => {
    this.props.login(this.state.username, this.state.password)
  }

  render() {

    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
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

          <Item style={styles.input} >
            <Input 
              placeholder='Password' 
              secureTextEntry={true} 
              autoCorrect={false}  
              autoCapitalize="none"
              onChangeText={t => this.setState({password: t})}
            />
          </Item>

          <Button style={styles.button} onPress={this.login}>
            <Text>Login</Text>
          </Button>

          <Button style={[styles.button, styles.back]} onPress={this.goToRegister}>
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
  loading: state.login.loading,
  error: state.login.error
})


const dispatchMap = dispatch => ({
  login: (username, password) => {
    dispatch(prepareLogin())
    dispatch(loginThunk(username, password))
  }
})


export default connect(stateMap, dispatchMap)(Login)
