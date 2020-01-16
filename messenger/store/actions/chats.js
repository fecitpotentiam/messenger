export const LOAD_CHATS = 'chats/LOAD_CHATS'
export const CHATS_LOADED = 'chats/CHATS_LOADED'
export const CHATS_LOAD_FAILED = 'chats/CHATS_LOAD_FAILED'
export const SELECT_CHAT = 'chats/SELECT_CHAT'


export const loadChats = (offset) => ({
  type: LOAD_CHATS,
  payload: {offset}
})


export const chatsLoaded = (chats, order, created=false) => ({
    type: CHATS_LOADED,
    payload: {chats, order, created}
})

export const loginFailed = () => ({
    type: CHATS_LOAD_FAILED
})

export const selectChat = chatId => ({
  type: SELECT_CHAT,
  payload: {chatId}
})
