import React from 'react';
import {Route, IndexRoute} from 'react-router';

class App extends React.Component {
	render() {
		return <span>yo!</span>;
	}
}

export default (
	<Route path="/" component={App}>
	</Route>
);
