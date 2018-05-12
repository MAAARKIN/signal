import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'

import './assets/styles/theme.less'
import './assets/styles/style.css'
import './assets/styles/color-brewer.css'

import App from './container/App'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));