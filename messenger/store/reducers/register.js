import { PREPARE_REGISTER, REGISTER_SUCCESSFUL, REGISTER_FAILED } from '../actions/register'
import {LOGOUT} from '../actions/auth'


const defaultState = {
    name: null,
    username: null,
    email: null,
    password: null,
    loading: false,
    error: false
}


export default function registerReducer(state = defaultState, action) {
    switch (action.type) {
        case LOGOUT:
            return defaultState
        case PREPARE_REGISTER:
            return {
                name: action.name,
                username: action.username,
                email: action.email,
                password: action.password,
                loading: true,
                error: false
            }
        case REGISTER_SUCCESSFUL:
            return {
                name: null,
                username: null,
                email: null,
                password: null,
                loading: false,
                error: false
            }
        case REGISTER_FAILED:
            return {
                name: state.name,
                username: state.username,
                email: state.email,
                password: state.password,
                loading: false,
                error: true
            }
        default:
            return state;
    }
}
