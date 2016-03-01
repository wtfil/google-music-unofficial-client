import React from 'react';
import {Route} from 'react-router';

import Login from './containers/Login';
import Authorization from './containers/Authorization';

export default (
	<Route>
		<Route path="/" component={Authorization}>
		</Route>
		<Route path="/login" component={Login}></Route>
	</Route>
);
