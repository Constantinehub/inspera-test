import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './css/base.scss';
import * as theme from './utils/theme-config.json';
import App from './components/App';
import configureStore from './store/configureStore';
import { setToLS } from './utils/storage';

const store = configureStore();
const rootElement = document.getElementById('app');

setToLS('allThemes', theme.default);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement,
);
