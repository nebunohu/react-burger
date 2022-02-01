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

const composedEnhancers = composeWithDevTools(applyMiddleware(thunkMiddleware, socketMiddleware(`${WS_API_URL}/orders`)));

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
