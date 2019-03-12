import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

import configureStore from './setup/store';
import Routes from './router';

import './index.css';

const initialState = fromJS({});
const store = configureStore(initialState);

ReactDOM.render(
	<AppContainer>
		<Provider store={store}>
			<Routes />
		</Provider>
	</AppContainer>,
  document.getElementById('root'));
  
serviceWorker.unregister();
