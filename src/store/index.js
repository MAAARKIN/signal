import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { applyMiddleware, compose, createStore } from 'redux'

import rootReducer from '../reducers'

const middleware = [thunk]

if (!process.env.NODE_ENV) {
    middleware.push(createLogger());
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    rootReducer,
    composeEnhancer(
        applyMiddleware(
            ...middleware
        ),
    ),
)

export default store