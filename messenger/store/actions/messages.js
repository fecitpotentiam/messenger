export const MESSAGES_LOADED = 'messages/MESSAGES_LOADED'
export const CHAT_MESSAGES_LOADED = 'messages/CHAT_MESSAGES_LOADED'
export const MESSAGE_RECEIVED = 'messages/MESSAGE_RECEIVED'


export const messagesLoaded = messages => ({
  type: MESSAGES_LOADED,
  payload: {messages}
})

export const chatMessagesLoaded = (chatId, messages, order) => ({
  type: CHAT_MESSAGES_LOADED,
  payload: {chatId, messages, order}
})

export const messageReceived = message => ({
  type: MESSAGE_RECEIVED,
  payload: {message}
})
