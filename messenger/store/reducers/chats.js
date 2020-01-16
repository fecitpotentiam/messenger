import {LOAD_CHATS, CHATS_LOADED, CHATS_LOAD_FAILED, SELECT_CHAT} from '../actions/chats'
import {CHAT_MESSAGES_LOADED, MESSAGE_RECEIVED} from '../actions/messages'
import {LOGOUT} from '../actions/auth'


const defaultState = {
    chats: new Map(),
    order: [],
    chatId: 0,
    loading: false,
    error: false
}


export default function chatsReducer(state = defaultState, action) {
    switch (action.type) {
        case LOGOUT:
            return defaultState;

        case LOAD_CHATS:
            return {
                chats: state.chats,
                order: state.order,
                chatId: state.chatId,
                loading: true,
                error: false
            }
        case CHATS_LOADED:
            let newOrder = action.payload.created ?
              [...state.order, ...action.payload.order]:
              [...action.payload.order, ...state.order]

            return {
                chats: new Map([...state.chats, ...action.payload.chats]),
                order: newOrder.filter((v,i) => newOrder.indexOf(v) === i),
                chatId: state.chatId,
                loading: false,
                error: false
            }
        case CHATS_LOAD_FAILED:
            return {
                chats: state.chats,
                order: state.order,
                chatId: state.chatId,
                loading: false,
                error: true
            }

        case SELECT_CHAT:
            return {
                ...state,
                chatId: action.payload.chatId
            }

        case MESSAGE_RECEIVED: {
            let message = action.payload.message
            let oldChat = state.chats.get(message.chat)

            let chat = {...oldChat, order: [...oldChat.order, message.id], last_message: message.id}
            let order = state.order.filter(id => id !== chat.id)
            return {
                chats: new Map([...state.chats, [chat.id, chat]]),
                order: [chat.id, ...order],
                chatId: state.chatId,
                loading: state.loading,
                error: state.error
            }
        }

        case CHAT_MESSAGES_LOADED: {
            let oldChat = state.chats.get(action.payload.chatId)
            let chat = {...oldChat, order: [...action.payload.order, ...oldChat.order]}

            return {
                chats: new Map([...state.chats, [chat.id, chat]]),
                order: state.order,
                chatId: state.chatId,
                loading: state.loading,
                error: state.error
            }
        }

        default:
            return state;
    }
}
