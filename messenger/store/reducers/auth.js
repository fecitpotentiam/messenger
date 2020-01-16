import { LOGIN_SUCCESSFUL } from "../actions/login";
import {LOGOUT} from '../actions/auth'


const defaultState = {
  token: null,
  userId: null
}

export default function authReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGOUT:
      return defaultState
    case LOGIN_SUCCESSFUL:
      return {
        token: action.payload.token,
        userId: action.payload.id
      }
    default:
      return state
  }

}

