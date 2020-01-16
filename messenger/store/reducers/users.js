import { USERS_LOADED, USERS_UPDATED } from "../actions/users";
import {LOGOUT} from '../actions/auth'

const defaultState = {
    users: new Map()
}


export default function usersReducer(state = defaultState, action) {
    switch (action.type) {
        case LOGOUT:
            return defaultState
        case USERS_LOADED:
        case USERS_UPDATED:
            return {
                users: new Map([...state.users, ...action.payload.users])
            }
        default:
            return state
    }
}
