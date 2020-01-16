import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import loginReducer from './reducers/login'
import registerReducer from './reducers/register'
import usersReducer from './reducers/users'
import chatsReducer from './reducers/chats'
import authReducer from './reducers/auth'
import createChatReducer from './reducers/createChat'
import messagesReducer from './reducers/messages'


const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    users: usersReducer,
    chats: chatsReducer,
    auth: authReducer,
    createChat: createChatReducer,
    messages: messagesReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
