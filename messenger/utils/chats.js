import store from '../store/store'


export const chatName = chat => {

  switch (chat.type) {
    case "dialog":
      let state = store.getState()

      let otherMember = state.users.users.get(chat.members.filter(v => v !== state.auth.userId)[0])

      return otherMember.name

    default:
      return chat.data.name
  }

}
