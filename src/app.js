import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

const tokenStr = localStorage.getItem('token');
const token = JSON.parse(tokenStr);
if (token) {
  store.dispatch({ type: 'TOKEN', token });
  // store.dispatch(startSetExpenses()).then(() => {
  renderApp();
  if (history.location.pathname === '/') {
    history.push('/dashboard');
  }
  // });
} else {
  store.dispatch({ type: 'LOGOUT' });
  renderApp();
  history.push('/');
}

