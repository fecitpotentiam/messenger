import {SOCKET_ROUTE} from '../constants'
import {Socket}  from 'phoenix/assets/js/phoenix'
import store from '../../store/store'
import {chatsLoaded, selectChat} from '../../store/actions/chats'
import { usersLoaded } from '../../store/actions/users'
import {chatMessagesLoaded, messageReceived, messagesLoaded} from '../../store/actions/messages'
import {createdFailed, createdSuccessful} from '../../store/actions/createChat'
import NavigationService from '../navigator'
import { StackActions, NavigationActions } from 'react-navigation'


let socket
let userChannel
let chatChannels = {}


export const connectSocket = token => {

  socket = new Socket(SOCKET_ROUTE, {params: {token}})
  socket.connect()
}

export const connectUserChannel = userId => {
  userChannel = socket.channel(`user:${userId}`)
  userChannel.join()

  userChannel.on("chats_loaded", ({body}) => {
    let chats = body.chats
    let users = []

    let messages = chats.reduce((map, chat) => {
      map[chat.last_message.id] = chat.last_message;
      return map;
    }, {})

    chats = chats.map(c => ({...c, last_message: c.last_message.id, order: [c.last_message.id]}))

    store.dispatch(messagesLoaded(messages))

    for (let chat in chats) {
      users = [...users, ...chats[chat].members]
      chats[chat].members = chats[chat].members.map(m => m.id)
    }

    store.dispatch(
      usersLoaded(
        new Map(users.map(u => [u.id, u]))
      )
    )
    store.dispatch(
      chatsLoaded(
        new Map(chats.map(c => [c.id, c])),
        chats.map(c => c.id)
      )
    )

    for (let chat in chats) {
      connectChatChannel(chats[chat])
    }
  })

  userChannel.on("self_loaded", ({body}) => {

  })
  userChannel.on("dialog_created", ({body}) => {
    let dialog = body.dialog
    dialog.order = [dialog.last_message.id]
    let users = new Map(dialog.members.map(u => [u.id, u]))

    store.dispatch(messagesLoaded({[dialog.last_message.id]: dialog.last_message}))
    store.dispatch(usersLoaded(users))

    dialog.last_message = dialog.last_message.id
    dialog.members = dialog.members.map(m => m.id)

    store.dispatch(chatsLoaded(new Map([[dialog.id, dialog]]), [dialog.id], true))
    connectChatChannel(dialog)

    if (store.getState().createChat.loading) {
      store.dispatch(createdSuccessful(''))
      store.dispatch(selectChat(dialog.id))
      NavigationService.dispatch(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Chats' })],
      }))
      NavigationService.navigate('Chat', {header: null})
    }
  })
  userChannel.on("dialog_creation_failed", response => {
    store.dispatch(createdFailed())
  })

  userChannel.push("load_self", null)
  userChannel.push("load_chats", {offset: 0})
}

export const connectChatChannel = chat => {
  let chatId = chat.id

  if (chatId !== undefined && chatId != null && !(chatId in chatChannels)) {
    let chatChannel = socket.channel(`chat:${chatId}`)

    chatChannel.on("message", ({body}) => {
      body.author = body.author.id
      store.dispatch(messageReceived(body))
    })

    chatChannel.on("messages_loaded", ({body}) => {
      if (body.messages.length > 0) {

        let messages = body.messages.reduce((map, message) => {
          map[message.id] = message;
          message.author = message.author.id
          return map;
        }, {})

        store.dispatch(chatMessagesLoaded(
          body.messages[0].chat,
          messages,
          body.messages.map(m => m.id).reverse()
        ))
      }
    })
  
    chatChannel.join()
    chatChannels[chatId] = chatChannel
    chatChannel.push('load_messages_before', {message_id: chat.last_message})
  }  
}

const clearChannels = async () => {
  await socket.disconnect()
  chatChannels = {}
  userChannel = null
}

export {
  socket,
  userChannel,
  chatChannels,
  clearChannels
}
