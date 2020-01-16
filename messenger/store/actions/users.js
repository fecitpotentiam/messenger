export const USERS_LOADED = 'users/USERS_LOADED'
export const USERS_UPDATED = 'users/USERS_UPDATED'


export const usersLoaded = (users) => ({
    type: USERS_LOADED,
    payload: {users}
})

export const usersUpdated = (users) => ({
    type: USERS_UPDATED,
    payload: {users}
})
