import Axios from 'axios'
import { API_ROUTE } from '../../utils/constants'
import { loginSuccessful, loginFailed } from '../actions/login'
import { usersLoaded } from '../actions/users'
import { connectSocket, connectUserChannel } from '../../utils/channels/socket'
import NavigationService from '../../utils/navigator'


export const loginThunk = (username, password) => async dispatch => {

    try {
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        }
        const response = await fetch(API_ROUTE + '/api/login', config)

        if (response.ok) {
            let data = await response.json()
            
            dispatch(usersLoaded([data.user]))
            dispatch(loginSuccessful(data.token, data.user.id))

            connectSocket(data.token)
            connectUserChannel(data.user.id)

            // NavigationService.navigate('Chats', {header: null})
            NavigationService.navigate('Chats', {header: null})

        } else {
            dispatch(loginFailed())
        }
    } catch (error) {
        dispatch(loginFailed())
    }
}
