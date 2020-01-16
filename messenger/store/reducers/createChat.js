import { PREPARE_CREATING, CREATED_SUCCESSFUL, CREATED_FAILED } from '../actions/createChat'
import {LOGOUT} from '../actions/auth'


const defaultState = {
  username: '',
  loading: false,
  error: false
}


export default function createChatReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGOUT:
      return defaultState

    case PREPARE_CREATING:
      return {
        username: action.username,
        loading: true,
        error: false
      }
    case CREATED_SUCCESSFUL:
      return {
        username: '',
        loading: false,
        error: false
      }
    case CREATED_FAILED:
      return {
        username: '',
        loading: false,
        error: true
      }
    default:
      return state;
  }
}
