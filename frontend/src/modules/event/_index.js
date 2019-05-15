import {takeEvery, call, put, all} from 'redux-saga/effects'
import axios from 'axios'
import { setLoadingBar } from '../loading_bar/_index'
/*
*Consts
*/

const SUBMIT_EVENT = 'SUBMIT_EVENT'
const LOAD_TOP_SUBMISSIONS = 'LOAD_TOP_SUBMISSIONS'
const LOAD_LAST_ACCEPTED_SUBMISSIONS = 'LOAD_LAST_ACCEPTED_SUBMISSIONS'
const SEARCH_EVENTS = 'SEARCH_EVENTS'
const SEARCH_SUBMISSIONS = 'SEARCH_SUBMISSIONS'
const LOAD_EVENT = 'LOAD_EVENT'
const LOAD_YOUR_VOTE = 'LOAD_YOUR_VOTE'
const SET_YOUR_VOTE = 'SET_YOUR_VOTE'
const LOAD_AVAILABLE_YEARS = 'LOAD_AVAILABLE_YEARS'
const ACCEPT_SUBMISSION = 'ACCEPT_SUBMISSION'
const REJECT_SUBMISSION = 'REJECT_SUBMISSION'

const SUCCESS = 'SUCCESS'
const FAIL = 'FAIL'

/*
*Actions
*/

export const submitEvent = (data, auth) => {
  return{
      type: SUBMIT_EVENT,
      data: data,
      auth: auth
  }
}

export const loadTopSubmissions = () => {
  return{
    type: LOAD_TOP_SUBMISSIONS,
    method: 'get',
    url: '/event/get_top_submissions/'
  }
}

export const loadLastAcceptedSubmissions = () => {
  return{
    type: LOAD_LAST_ACCEPTED_SUBMISSIONS,
    method: 'get',
    url: '/event/get_last_accepted_submissions/'
  }
}

export const searchEvents = (data) => {
  return{
    type: SEARCH_EVENTS,
    method: 'post',
    url: '/event/search_events/',
    data: data
  }
}

export const searchSubmissions = (data) => {
  return{
    type: SEARCH_SUBMISSIONS,
    method: 'post',
    url: '/event/search_submissions/',
    data: data
  }
}

export const loadEvent = (id) => {
  return{
    type: LOAD_EVENT,
    method: 'get',
    url: `/event/get/${id}/`,
    id: id
  }
}

export const loadYourVote = (data) => {
  return{
    type: LOAD_YOUR_VOTE,
    method: 'post',
    url: `/event/get_your_vote/`,
    data: data
  }
}

export const setYourVote = (data, vote) => {
  return{
    type: SET_YOUR_VOTE,
    method: 'post',
    url: `/event/set_your_vote/`,
    data: data,
    vote: vote
  }
}

export const loadAvailableYears = () => {
  return{
    type: LOAD_AVAILABLE_YEARS,
    method: 'get',
    url: `/event/get_available_years/`
  }
}

export const acceptSubmission = (data) => {
  return{
    type: ACCEPT_SUBMISSION,
    method: 'post',
    url: `/event/accept_submission/`,
    data: data
  }
}

export const rejectSubmission = (data) => {
  return{
    type: REJECT_SUBMISSION,
    method: 'post',
    url: `/event/reject_submission/`,
    data: data
  }
}

/*
*Reducer
*/

let defaultState = {
  s_data: null,
  top_submissions: [],
  last_accepted_submissions: [],

  search_data: [],
  search_loading: false,

  search_submissions: [],
  search_submissions_loading: false,

  event_data: null,
  event_data_loading: false,

  your_vote: null,

  available_years: [],

  accept_submission: null,
  accept_submission_loading: false,
  reject_submission: null,
  reject_submission_loading: false
}

export default function reducer (state=defaultState, action){
  const {type, response, data, vote, error} = action
  switch (type) {

    case SUBMIT_EVENT:
      return Object.assign({}, state, { s_data: null })
    case SUBMIT_EVENT + SUCCESS:
      return Object.assign({}, state, { s_data: data })
    case SUBMIT_EVENT + FAIL:
      return Object.assign({}, state, { s_data: data })

    case LOAD_TOP_SUBMISSIONS:
      return Object.assign({}, state, { top_submissions: [] })
    case LOAD_TOP_SUBMISSIONS + SUCCESS:
      return Object.assign({}, state, { top_submissions: data })
    case LOAD_TOP_SUBMISSIONS + FAIL:
      return Object.assign({}, state, { top_submissions: data })

    case LOAD_LAST_ACCEPTED_SUBMISSIONS:
      return Object.assign({}, state, { last_accepted_submissions: [] })
    case LOAD_LAST_ACCEPTED_SUBMISSIONS + SUCCESS:
      return Object.assign({}, state, { last_accepted_submissions: data })
    case LOAD_LAST_ACCEPTED_SUBMISSIONS + FAIL:
      return Object.assign({}, state, { last_accepted_submissions: data })

    case SEARCH_EVENTS:
      return Object.assign({}, state, { search_loading: true})
    case SEARCH_EVENTS + SUCCESS:
      return Object.assign({}, state, { search_data: data, search_loading: false })
    case SEARCH_EVENTS + FAIL:
      return Object.assign({}, state, { search_data: data, search_loading: false })

    case SEARCH_SUBMISSIONS:
      return Object.assign({}, state, { search_submissions_loading: true})
    case SEARCH_SUBMISSIONS + SUCCESS:
      return Object.assign({}, state, { search_submissions: data, search_submissions_loading: false })
    case SEARCH_SUBMISSIONS + FAIL:
      return Object.assign({}, state, { search_submissions: data, search_submissions_loading: false })

    case LOAD_EVENT:
      return Object.assign({}, state, { event_data_loading: true, accept_submission: null, reject_submission: null})
    case LOAD_EVENT + SUCCESS:
      return Object.assign({}, state, { event_data: data, event_data_loading: false })
    case LOAD_EVENT + FAIL:
      return Object.assign({}, state, { event_data: data, event_data_loading: false })

    case LOAD_YOUR_VOTE:
      return Object.assign({}, state, { your_vote: 'No vote'})
    case LOAD_YOUR_VOTE + SUCCESS:
      return Object.assign({}, state, { your_vote: data})

    case SET_YOUR_VOTE:
      if (vote === 'yes'){
        if (state.your_vote === 'yes'){
          return Object.assign({}, state, {
             your_vote: null, event_data: Object.assign({}, state.event_data, {
                rating: state.event_data.rating - 1, pos_votes: state.event_data.pos_votes - 1
             })
           })
        }
        else if (state.your_vote === 'no'){
          return Object.assign({}, state, {
             your_vote: vote, event_data: Object.assign({}, state.event_data, {
                rating: state.event_data.rating + 2, pos_votes: state.event_data.pos_votes + 1, neg_votes: state.event_data.neg_votes - 1
             })
           })
        }
        else{
          return Object.assign({}, state, {
             your_vote: vote, event_data: Object.assign({}, state.event_data, {
                rating: state.event_data.rating + 1, pos_votes: state.event_data.pos_votes + 1
             })
           })
        }
      }
      else{
        if (state.your_vote === 'no'){
          return Object.assign({}, state, {
             your_vote: null, event_data: Object.assign({}, state.event_data, {
                rating: state.event_data.rating + 1, neg_votes: state.event_data.neg_votes - 1
             })
           })
        }
        else if (state.your_vote === 'yes'){
          return Object.assign({}, state, {
             your_vote: vote, event_data: Object.assign({}, state.event_data, {
                rating: state.event_data.rating - 2, pos_votes: state.event_data.pos_votes - 1, neg_votes: state.event_data.neg_votes + 1
             })
           })
        }
        else{
          return Object.assign({}, state, {
             your_vote: vote, event_data: Object.assign({}, state.event_data, {
                rating: state.event_data.rating - 1, neg_votes: state.event_data.neg_votes + 1
             })
           })
        }
      }
    case SET_YOUR_VOTE + SUCCESS:
      return Object.assign({}, state, { your_vote: data})

    case LOAD_AVAILABLE_YEARS:
      return Object.assign({}, state, { available_years: []})
    case LOAD_AVAILABLE_YEARS + SUCCESS:
      return Object.assign({}, state, { available_years: data})

    case ACCEPT_SUBMISSION:
      return Object.assign({}, state, { accept_submission: null, accept_submission_loading: true})
    case ACCEPT_SUBMISSION + SUCCESS:
      return Object.assign({}, state, { accept_submission: data, accept_submission_loading: false})

    case REJECT_SUBMISSION:
      return Object.assign({}, state, { reject_submission: null, reject_submission_loading: true})
    case REJECT_SUBMISSION + SUCCESS:
      return Object.assign({}, state, { reject_submission: data, reject_submission_loading: false})


    default:
      return state
  }
}

/*
*Sagas
*/

export const EventSaga = function* () {
  yield all([
    takeEvery(SUBMIT_EVENT, SubmitEventSaga),
    takeEvery(LOAD_TOP_SUBMISSIONS, EventApiSaga),
    takeEvery(LOAD_LAST_ACCEPTED_SUBMISSIONS, EventApiSaga),
    takeEvery(SEARCH_EVENTS, EventApiSaga),
    takeEvery(SEARCH_SUBMISSIONS, EventApiSaga),
    takeEvery(LOAD_EVENT, EventApiSaga),
    takeEvery(LOAD_YOUR_VOTE, EventApiSaga),
    takeEvery(SET_YOUR_VOTE, EventApiSaga),
    takeEvery(LOAD_AVAILABLE_YEARS, EventApiSaga),
    takeEvery(ACCEPT_SUBMISSION, EventApiSaga),
    takeEvery(REJECT_SUBMISSION, EventApiSaga)
 ])
}

function* EventApiSaga(action){
  try {
    yield put(setLoadingBar(true))
    const response = action.method === 'get' ? yield axios.get('https://api.savesplace.com' + action.url) : yield axios.post('https://api.savesplace.com' + action.url, action.data)
    yield put(setLoadingBar(false))
    console.log(response.data)
    if (!response.data.error){
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

function* SubmitEventSaga(action){
  const json = JSON.stringify(action.data)
  const blob = new Blob([json], {
    type: 'application/json'
  })
  const data = new FormData()
  data.append('data', blob)
  data.append('thumbnail', action.data.thumbnail)
  data.append('token', action.auth.token)
  data.append('id', action.auth.id)
  try {
    const response = yield axios.post('https://api.savesplace.com/event/submit/', data)
    console.log(response.data)
    if (!response.data.error){
      window.location.href = `/event/${response.data}`
      yield put({
        type: SUBMIT_EVENT + SUCCESS,
        data: response.data
      })
    }
    else{
      yield put({
        type: SUBMIT_EVENT + FAIL,
        data: response.data
      })
    }
  }
  catch(error) {
    yield put({
      type: SUBMIT_EVENT + FAIL,
      data: {error: ['Server error!']}
    })
  }
}
