export const PREPARE_LOGIN = 'login/PREPARE_LOGIN'
export const LOGIN_SUCCESSFUL = 'login/LOGIN_SUCCESSFUL'
export const LOGIN_FAILED = 'login/LOGIN_FAILED'


export const prepareLogin = () => ({
  type: PREPARE_LOGIN
})


export const loginSuccessful = (token, id) => ({
    type: LOGIN_SUCCESSFUL,
    payload: {
      token, id
    }
})

export const loginFailed = () => ({
    type: LOGIN_FAILED
})
