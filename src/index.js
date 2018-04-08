import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'

// import 'antd/dist/antd.less'
import './assets/styles/theme.less'
import './assets/styles/style.css'

import App from './container/App'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));