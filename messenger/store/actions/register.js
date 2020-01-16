export const PREPARE_REGISTER = 'register/PREPARE_REGISTER'
export const REGISTER_SUCCESSFUL = 'register/REGISTER_SUCCESSFUL'
export const REGISTER_FAILED = 'register/REGISTER_SUCCESSFUL'


export const prepareRegister = ({name, username, email, password}) => ({
  type: PREPARE_REGISTER,
  payload: {name, username, email, password}
})


export const registerSuccessful = () => ({
    type: REGISTER_SUCCESSFUL
})

export const registerFailed = () => ({
  type: REGISTER_SUCCESSFUL
})
