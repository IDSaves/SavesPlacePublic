import { all } from 'redux-saga/effects'
import { AuthSaga } from '../modules/auth/_index'
import { EventSaga } from '../modules/event/_index'
import { StatsSaga } from '../modules/stats/_index'
import { UserSaga } from '../modules/user/_index'

export const rootSaga = function* () {
  yield all([AuthSaga(), EventSaga(), StatsSaga(), UserSaga()])
}
