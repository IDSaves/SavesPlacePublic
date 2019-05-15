import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './saga'
import thunk from 'redux-thunk'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(sagaMiddleware, thunk)
const store = createStore(reducer, enhancer)

sagaMiddleware.run(rootSaga)

export default store
