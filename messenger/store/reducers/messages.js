import {MESSAGE_RECEIVED, MESSAGES_LOADED, CHAT_MESSAGES_LOADED} from '../actions/messages'
import {LOGOUT} from '../actions/auth'


export default function messagesReducer(state={}, action) {
  switch (action.type) {
    case LOGOUT:
      return {}
    case MESSAGES_LOADED:
      return {...state, ...action.payload.messages}
    case CHAT_MESSAGES_LOADED:
      return {...state, ...action.payload.messages}
    case MESSAGE_RECEIVED:
      return {...state, [action.payload.message.id]: action.payload.message}
    default:
      return state
  }
}
