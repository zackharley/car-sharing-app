import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import reducers from './reducers';
import Root from './components/Root';

let store = createStore(reducers);

render(
	<Root store={store} />,
	document.getElementById('root')
);