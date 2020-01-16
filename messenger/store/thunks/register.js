import Axios from 'axios'
import { API_ROUTE } from '../../utils/constants'
import {usersLoaded} from '../actions/users'
import {loginFailed, loginSuccessful} from '../actions/login'
import {connectSocket, connectUserChannel} from '../../utils/channels/socket'
import NavigationService from '../../utils/navigator'
import {registerFailed} from '../actions/register'


export const registerThunk = (name, username, email, password) => async dispatch => {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password, email, name})
        }
        const response = await fetch(API_ROUTE + '/api/register', config)

        if (response.ok) {
            let data = await response.json()

            dispatch(usersLoaded([data.user]))
            dispatch(loginSuccessful(data.token, data.user.id))

            connectSocket(data.token)
            connectUserChannel(data.user.id)

            // NavigationService.navigate('Chats', {header: null})
            NavigationService.navigate('Chats', {header: null})

        } else {
            dispatch(registerFailed())
        }
    } catch (error) {
        dispatch(registerFailed())
    }
}
