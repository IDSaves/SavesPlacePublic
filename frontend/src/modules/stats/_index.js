import {takeEvery, call, put, all} from 'redux-saga/effects'
import axios from 'axios'

/*
*Consts
*/

const LOAD_STATS = 'LOAD_STATS'
const LOAD_TOP_USERS = 'LOAD_TOP_USERS'
const COUNT_EVET_TYPES = 'COUNT_EVET_TYPES'
const COUNT_EVENTS_LAST_6_MONTHS = 'COUNT_EVENTS_LAST_6_MONTHS'

const SUCCESS = 'SUCCESS'
const FAIL = 'FAIL'

/*
*Actions
*/

export const loadStats = () => {
  return{
    type: LOAD_STATS,
    method: 'get',
    url: '/stats/get/'
  }
}

export const loadTopUsers = () => {
  return{
    type: LOAD_TOP_USERS,
    method: 'get',
    url: '/stats/get_top_users/'
  }
}

export const countEventTypes = () => {
  return{
    type: COUNT_EVET_TYPES,
    method: 'get',
    url: '/stats/count_event_types/'
  }
}

export const countEventsLast6Months = () => {
  return{
    type: COUNT_EVENTS_LAST_6_MONTHS,
    method: 'get',
    url: '/stats/cout_events_last_6_months/'
  }
}

/*
*Reducer
*/

let defaultState = {
  stats: null,
  top_users: [],
  event_types: null,
  events_last_6_months: null
}

export default function reducer (state=defaultState, action){
  const {type, response, data, error} = action
  switch (type) {

    case LOAD_STATS:
      return Object.assign({}, state, { stats: null})
    case LOAD_STATS + SUCCESS:
      return Object.assign({}, state, { stats: data})
    case LOAD_STATS + FAIL:
      return Object.assign({}, state, { stats: data})

    case LOAD_TOP_USERS:
      return Object.assign({}, state, { top_users: null})
    case LOAD_TOP_USERS + SUCCESS:
      return Object.assign({}, state, { top_users: data})
    case LOAD_TOP_USERS + FAIL:
      return Object.assign({}, state, { top_users: data})

    case COUNT_EVET_TYPES:
      return Object.assign({}, state, { event_types: null})
    case COUNT_EVET_TYPES + SUCCESS:
      return Object.assign({}, state, { event_types: data})
    case COUNT_EVET_TYPES + FAIL:
      return Object.assign({}, state, { event_types: data})

    case COUNT_EVENTS_LAST_6_MONTHS:
      return Object.assign({}, state, { events_last_6_months: null})
    case COUNT_EVENTS_LAST_6_MONTHS + SUCCESS:
      return Object.assign({}, state, { events_last_6_months: data})
    case COUNT_EVENTS_LAST_6_MONTHS + FAIL:
      return Object.assign({}, state, { events_last_6_months: data})

    default:
      return state
  }
}

/*
*Sagas
*/

export const StatsSaga = function* () {
  yield all([
    takeEvery(LOAD_STATS, StatsApiSaga),
    takeEvery(LOAD_TOP_USERS, StatsApiSaga),
    takeEvery(COUNT_EVET_TYPES, StatsApiSaga),
    takeEvery(COUNT_EVENTS_LAST_6_MONTHS, StatsApiSaga)
 ])
}

function* StatsApiSaga(action){
  try {
    const response = action.method === 'get' ? yield axios.get('https://api.savesplace.com' + action.url) : yield axios.post('https://api.savesplace.com' + action.url, action.data)
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
