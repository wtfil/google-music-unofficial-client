import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
	render() {
		return <h1>React!</h1>;
	}
}

render(
	<App/>,
	document.querySelector('[data-app]')
);
