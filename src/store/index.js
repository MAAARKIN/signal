import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'

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

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(() => {
        const nextRootReducer = require('../reducers/index').default
        store.replaceReducer(nextRootReducer);
    });
}

export default store