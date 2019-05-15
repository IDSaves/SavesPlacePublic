import {combineReducers} from 'redux'

import AuthReducer from '../modules/auth/_index'
import EventReducer from '../modules/event/_index'
import StatsReducer from '../modules/stats/_index'
import UserReducer from '../modules/user/_index'
import LoadingBarReducer from '../modules/loading_bar/_index'

const reducer = combineReducers({AuthReducer, EventReducer, StatsReducer, UserReducer, LoadingBarReducer })
export default reducer
