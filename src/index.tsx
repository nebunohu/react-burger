import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import './fonts/fonts.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

import rootReducer from './services/reducers';
import { socketMiddleware } from './redux/middleware/socket-middleware';
import { WS_API_URL } from './utils/url';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START, WS_CONNECTION_START_WITH_TOKEN, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from './services/actions/ws-actions';
import { TMiddlewareWsActions } from './types/ws';

const wsActions: TMiddlewareWsActions = {
  wsInit: WS_CONNECTION_START,
  wsInitWithToken: WS_CONNECTION_START_WITH_TOKEN,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESS,
  onMessage: WS_GET_MESSAGE
}

const composedEnhancers = composeWithDevTools(applyMiddleware(thunkMiddleware, socketMiddleware(`${WS_API_URL}/orders`, wsActions)));

export const store = createStore(rootReducer, composedEnhancers);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
