import { PREPARE_LOGIN, LOGIN_SUCCESSFUL, LOGIN_FAILED } from '../actions/login'
import {LOGOUT} from '../actions/auth'


const defaultState = {
    loading: false,
    error: false
}


export default function loginReducer(state = defaultState, action) {
    switch (action.type) {
        case LOGOUT:
            return defaultState
      case PREPARE_LOGIN:
            return {
                ...state,
                loading: true,
                error: false
            }
        case LOGIN_SUCCESSFUL:
            return {
                loading: false,
                error: false
            }
        case LOGIN_FAILED:
            return {
                loading: false,
                error: true
            }
        default:
            return state;
    }
}


