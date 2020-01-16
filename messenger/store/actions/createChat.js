export const PREPARE_CREATING = 'createChat/PREPARE_CREATING'
export const CREATED_SUCCESSFUL = 'createChat/CREATED_SUCCESSFUL'
export const CREATED_FAILED = 'createChat/CREATED_FAILED'


export const prepareCreating = () => ({
  type: PREPARE_CREATING
})


export const createdSuccessful = (username) => ({
  type: CREATED_SUCCESSFUL,
  payload: {
    username
  }
})

export const createdFailed = () => ({
  type: CREATED_FAILED
})
