import {takeEvery, call, put, all} from 'redux-saga/effects'
import axios from 'axios'
import { setLoadingBar } from '../loading_bar/_index'

/*
*Consts
*/

const LOGIN = 'LOGIN'
const REGISTER = 'REGISTER'
const LOGOUT = 'LOGOUT'
const TOKEN_CHECK = 'TOKEN_CHECK'
const LOG_ERROR = 'LOG_ERROR'

const CONF_EMAIL = 'CONF_EMAIL'

const SUCCESS = 'SUCCESS'
const FAIL = 'FAIL'


/*
*Actions
*/

export const login = (data) => {
  return{
    type: LOGIN,
    data: data
  }
}

export const register = (data) => {
  return{
    type: REGISTER,
    data: data
  }
}

export const LogOut = () => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('auth_id')
  window.location.href = '/'
  return{
    type: LOGOUT
  }
}

export const check_token = (data) => {
  return{
    type: TOKEN_CHECK,
    data: data
  }
}

export const log_error = (data) => {
  return{
    type: LOG_ERROR,
    data: data
  }
}

export const confEmail = () => {
  return {
    type: CONF_EMAIL
  }
}

/*
*Reducer
*/

let defaultState = {
  data: null,
  loading: false,

  u_data: null,
  token_check: false
}

export default function reducer (state=defaultState, action){
  const {type, response, data} = action
  switch (type) {
    case LOGIN:
      return Object.assign({}, state, { data: null, loading: true })
    case LOGIN + SUCCESS:
      return Object.assign({}, state, { data: data, loading: false })
    case LOGIN + FAIL:
      return Object.assign({}, state, { data: data, loading: false })

    case REGISTER:
      return Object.assign({}, state, { data: null, loading: true })
    case REGISTER + SUCCESS:
      return Object.assign({}, state, { data: data, loading: false })
    case REGISTER + FAIL:
      return Object.assign({}, state, { data: data, loading: false })

    case TOKEN_CHECK + SUCCESS:
      return Object.assign({}, state, {
          token_check: true,
          u_data: {
            nickname: data.nickname,
            username: data.username,
            avatar: data.avatar,
            email: data.email,
            email_is_confirmed: data.email_is_confirmed,
            status: data.status,
            staff_level: data.staff_level
          }
       })
    case TOKEN_CHECK + FAIL:
      return Object.assign({}, state, { token_check: false, u_data: 'fail' })

    case LOG_ERROR:
      return Object.assign({}, state, { data: data })

    case CONF_EMAIL:
      return Object.assign({}, state, { u_data: Object.assign({}, state.u_data, { email_is_confirmed: true }) })
    default:
      return state
  }
}

/*
*Sagas
*/

export const AuthSaga = function* () {
  yield all([
    takeEvery(LOGIN, LoginSaga),
    takeEvery(REGISTER, RegisterSaga),
    takeEvery(TOKEN_CHECK, TokenCheckSaga)
  ])
}

function* LoginSaga(action){
  try {
    const response = yield axios.post('https://api.savesplace.com/user/auth/', action.data)
    console.log(response.data)
    if (!response.data.error){
      localStorage.setItem('auth_token', response.data.token)
      localStorage.setItem('auth_id', response.data.id)
      window.location.href = '/'
      yield put({
        type: LOGIN + SUCCESS,
        data: response.data.token
      })
    }
    else{
      yield put({
        type: LOGIN + FAIL,
        data: response.data
      })
    }
  }
  catch(error) {
    yield put({
      type: LOGIN + FAIL,
      data: {error: 'Server error!'}
    })
  }
}

function* RegisterSaga(action){
  try {
    const response = yield axios.post('https://api.savesplace.com/user/register/', action.data)
    if (!response.data.error){
      localStorage.setItem('auth_token', response.data.token)
      localStorage.setItem('auth_id', response.data.id)
      window.location.href = '/'
      yield put({
        type: REGISTER + SUCCESS,
        data: response.data.token
      })
    }
    else{
      yield put({
        type: REGISTER + FAIL,
        data: response.data
      })
    }
  }
  catch(error) {
    yield put({
      type: REGISTER + FAIL,
      data: 'Server error!'
    })
  }
}


function* TokenCheckSaga(action){
  try {
    yield put(setLoadingBar(true))
    const response = yield axios.post('https://api.savesplace.com/user/check_token/', action.data)
    yield put(setLoadingBar(false))
    if (response.data.valid === true){
      if (response.data.is_banned){
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_id')
        window.location.href = '/'
        yield put({
          type: TOKEN_CHECK + FAIL
        })
      }
      else{
        yield put({
          type: TOKEN_CHECK + SUCCESS,
          data: response.data
        })
      }
    }
    else{
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_id')
      window.location.href = '/'
      yield put({
        type: TOKEN_CHECK + FAIL
      })
    }
  }
  catch(error) {
    yield put({
      type: TOKEN_CHECK + FAIL
    })
  }
}
