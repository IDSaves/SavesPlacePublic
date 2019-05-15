import {takeEvery, call, put, all} from 'redux-saga/effects'
import axios from 'axios'
import { setLoadingBar } from '../loading_bar/_index'
import { confEmail } from '../auth/_index'
/*
*Consts
*/

const LOAD_USER_DATA = 'LOAD_USER_DATA'
const SET_SETTINGS = 'SET_SETTINGS'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
const SEND_CONFIRMATION_CODE = 'SEND_CONFIRMATION_CODE'
const CONFIRM_EMAIL = 'CONFIRM_EMAIL'
const SEND_PASSWORD_CODE = 'SEND_PASSWORD_CODE'
const RESET_PASSWORD = 'RESET_PASSWORD'
const CLEAR_PASSWORD_DATA = 'CLEAR_PASSWORD_DATA'
const CLEAR_SETTINGS_DATA = 'CLEAR_SETTINGS_DATA'

const SUCCESS = 'SUCCESS'
const FAIL = 'FAIL'

/*
*Actions
*/

export const loadUserData = (username) => {
  return{
    type: LOAD_USER_DATA,
    method: 'get',
    url: `/user/get/${username}/`,
    username: username
  }
}

export const setSettings = (data) => {
  return{
    type: SET_SETTINGS,
    method: 'post',
    url: `/user/settings/`,
    data: data
  }
}

export const changePassword = (data) => {
  return{
    type: CHANGE_PASSWORD,
    method: 'post',
    url: `/user/change_password/`,
    data: data
  }
}

export const sendConfirmationCode = (data) => {
  return{
    type: SEND_CONFIRMATION_CODE,
    method: 'post',
    url: `/user/send_email_code/`,
    data: data
  }
}

export const confirmEmail = (data) => {
  return{
    type: CONFIRM_EMAIL,
    method: 'post',
    url: `/user/confirm_email/`,
    data: data
  }
}

export const sendPasswordCode = (data) => {
  return{
    type: SEND_PASSWORD_CODE,
    method: 'post',
    url: '/user/send_password_reset_code/',
    data: data
  }
}

export const resetPassword = (data) => {
  return{
    type: RESET_PASSWORD,
    method: 'post',
    url: '/user/reset_password/',
    data: data
  }
}

export const clearSettingData = () => {
  return{
    type: CLEAR_SETTINGS_DATA
  }
}

export const clearPasswordData = () => {
  return{
    type: CLEAR_PASSWORD_DATA
  }
}

/*
*Reducer
*/

let defaultState = {
  data: null,
  loading: false,

  settings_data: null,
  settings_loading: false,

  password_set: null,
  password_set_loading: false,

  confirmation_data: null,
  confirmation_data_loading: false,

  confirmation_code_data: null,
  confirmation_code_data_loading: false,

  send_password_reset_code: null,
  send_password_reset_code_loading: false,

  reset_password: null,
  reset_password_loading: false
}

export default function reducer (state=defaultState, action){
  const {type, response, data} = action
  switch (type) {

    case LOAD_USER_DATA:
      return Object.assign({}, state, { data: null, loading: true })
    case LOAD_USER_DATA + SUCCESS:
      return Object.assign({}, state, { data: data, loading: false })
    case LOAD_USER_DATA + FAIL:
      return Object.assign({}, state, { data: data, loading: false })

    case SET_SETTINGS:
      return Object.assign({}, state, { settings_data: null, settings_loading: true })
    case SET_SETTINGS + SUCCESS:
      return Object.assign({}, state, { settings_data: data, settings_loading: false })
    case SET_SETTINGS + FAIL:
      return Object.assign({}, state, { settings_data: data, settings_loading: false })

    case CHANGE_PASSWORD:
      return Object.assign({}, state, { password_set: null, password_set_loading: true })
    case CHANGE_PASSWORD + SUCCESS:
      return Object.assign({}, state, { password_set: data, password_set_loading: false })
    case CHANGE_PASSWORD + FAIL:
      return Object.assign({}, state, { password_set: data, password_set_loading: false })

    case SEND_CONFIRMATION_CODE:
      return Object.assign({}, state, { confirmation_data: null, confirmation_data_loading: true })
    case SEND_CONFIRMATION_CODE + SUCCESS:
      return Object.assign({}, state, { confirmation_data: data, confirmation_data_loading: false })
    case SEND_CONFIRMATION_CODE + FAIL:
      return Object.assign({}, state, { confirmation_data: data, confirmation_data_loading: false })

    case CONFIRM_EMAIL:
      return Object.assign({}, state, { confirmation_code_data: null, confirmation_code_data_loading: true })
    case CONFIRM_EMAIL + SUCCESS:
      return Object.assign({}, state, { confirmation_code_data: data, confirmation_code_data_loading: false })
    case CONFIRM_EMAIL + FAIL:
      return Object.assign({}, state, { confirmation_code_data: data, confirmation_code_data_loading: false })

    case SEND_PASSWORD_CODE:
      return Object.assign({}, state, { send_password_reset_code: null, send_password_reset_code_loading: true })
    case SEND_PASSWORD_CODE + SUCCESS:
      return Object.assign({}, state, { send_password_reset_code: data, send_password_reset_code_loading: false })
    case SEND_PASSWORD_CODE + FAIL:
      return Object.assign({}, state, { send_password_reset_code: data, send_password_reset_code_loading: false })

    case RESET_PASSWORD:
      return Object.assign({}, state, { reset_password: null, reset_password_loading: true })
    case RESET_PASSWORD + SUCCESS:
      return Object.assign({}, state, { reset_password: data, reset_password_loading: false })
    case RESET_PASSWORD + FAIL:
      return Object.assign({}, state, { reset_password: data, reset_password_loading: false })

    case CLEAR_PASSWORD_DATA:
      return Object.assign({}, state, { password_set: null, password_set_loading: false })

    case CLEAR_SETTINGS_DATA:
      return Object.assign({}, state, { settings_data: null, settings_loading: false })

    default:
      return state
  }
}

/*
*Sagas
*/

export const UserSaga = function* () {
  yield all([
    takeEvery(LOAD_USER_DATA, UserApiSaga),
    takeEvery(SET_SETTINGS, SettingsSaga),
    takeEvery(CHANGE_PASSWORD, UserApiSaga),
    takeEvery(SEND_CONFIRMATION_CODE, UserApiSaga),
    takeEvery(CONFIRM_EMAIL, UserApiSaga),
    takeEvery(SEND_PASSWORD_CODE, UserApiSaga),
    takeEvery(RESET_PASSWORD, UserApiSaga)
  ])
}

function* UserApiSaga(action){
  try {
    yield put(setLoadingBar(true))
    const response = action.method === 'get' ? yield axios.get('https://api.savesplace.com' + action.url) : yield axios.post('https://api.savesplace.com' + action.url, action.data)
    yield put(setLoadingBar(false))
    console.log(response.data)
    if (!response.data.error){
      if (action.type === CONFIRM_EMAIL){
        yield put(confEmail())
      }
      yield put({
        type: action.type + SUCCESS,
        data: response.data
      })
    }
    else{
      yield put({
        type: action.type + FAIL,
        data: response.data
      })
    }
  }
  catch(error) {
    yield put({
      type: action.type + FAIL,
      data: {error: 'Server error!'}
    })
  }
}

function* SettingsSaga(action){
  try {
    yield put(setLoadingBar(true))
    const response = action.method === 'get' ? yield axios.get('https://api.savesplace.com' + action.url) : yield axios.post('https://api.savesplace.com' + action.url, action.data)
    yield put(setLoadingBar(false))
    console.log(response.data)
    if (!response.data.error){
      localStorage.setItem('auth_token', response.data.token)
      localStorage.setItem('auth_id', response.data.id)
      yield put({
        type: action.type + SUCCESS,
        data: response.data
      })
    }
    else{
      yield put({
        type: action.type + FAIL,
        data: response.data
      })
    }
  }
  catch(error) {
    yield put({
      type: action.type + FAIL,
      data: {error: 'Server error!'}
    })
  }
}
