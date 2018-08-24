
import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import consts from '../main/consts'

export function login(values) {
    return submit(values, `${consts.OAPI_URL}/login`)
}

export function signup(values) {
    return submit(values, `${consts.OAPI_URL}/signup`)
}

function submit(values, url) {
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                if (resp.data.token) {
                    dispatch([
                        { type: 'USER_FETCHED', payload: resp.data }
                    ])
                } else {
                    if (!resp.data.status) {
                        for (let error of Object.values(resp.data)) {
                            toastr.error('Error', error[0]);
                        }
                    } else {
                        toastr.error('Error', resp.data.status);
                        
                    }
                }
            })
            .catch(e => {
                for (let error of Object.values(e.response.data.errors)) {
					toastr.error('Error', error[0]);
				}
            })
    }
}

export function logout() {
    return { type: 'TOKEN_VALIDATED', payload: false }
}

export function validateToken(token) {
    return dispatch => {
        if (token) {
            axios.post(`${consts.OAPI_URL}/validateToken`, { token })
            .then(resp => {
                    dispatch({ type: 'TOKEN_VALIDATED', payload: resp.data })
                })
                .catch(e => dispatch({ type: 'TOKEN_VALIDATED', payload: false }))
        } else {
            dispatch({ type: 'TOKEN_VALIDATED', payload: false })
        }
    }
}

export function token() {
    if (localStorage.getItem('_scoolook_user')) {
		let userAuth = localStorage.getItem('_scoolook_user');
        var token = JSON.parse(userAuth).token;
        return token;
    } else {
        var token = null;
        return token;
    }
}