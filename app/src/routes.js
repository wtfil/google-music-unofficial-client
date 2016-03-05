import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Authorization from './containers/Authorization';
import Home from './containers/Home';
import Library from './containers/Library';
import Layout from './containers/Layout';
import Playlist from './containers/Playlist';

export default (
	<Route component={Authorization}>
		<Route component={Layout}>
			<Route path="/" component={Home} />
			<Route path="/radio" component={Home} />
			<Route path="/library" component={Library} />
			<Route path="/playlists/:id" component={Playlist} />
		</Route>
	</Route>
);