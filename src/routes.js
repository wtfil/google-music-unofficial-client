import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Authorization from './containers/Authorization';
import Home from './containers/Home';

export default (
	<Route component={Authorization}>
		<Route path="/" component={Home} />
	</Route>
);
