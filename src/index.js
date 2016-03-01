import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';

import createHashHistory from 'history/lib/createHashHistory';
import createRoutesWithHooks from './createRoutesWithHooks';
import createStore from './createStore';
import rawRoutes from './routes';

const {ipcRenderer} = electron;
const store = createStore();
const routes = createRoutesWithHooks(rawRoutes)(store);

ipcRenderer.on('key', (e, m) => console.log(m));

render(
	<Provider store={store}>
		<Router
			history={createHashHistory()}
			routes={routes}
		/>
	</Provider>,
	document.querySelector('[data-app]')
);
