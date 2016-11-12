import '../static/index.less';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';

import createHashHistory from 'history/lib/createHashHistory';
import createRoutesWithHooks from './createRoutesWithHooks';
import createStore from './createStore';
import rawRoutes from './routes';
import initKeys from './initKeys';

const store = createStore();
const routes = createRoutesWithHooks(rawRoutes)(store);

initKeys(store);

render(
	<Provider store={store}>
		<Router
			history={createHashHistory()}
			onUpdate={() => window.scrollTo(0, 0)}
			routes={routes}
		/>
	</Provider>,
	document.querySelector('[data-app]')
);
