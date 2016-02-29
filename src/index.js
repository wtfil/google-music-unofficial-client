import React from 'react';
import {render} from 'react-dom';
const {ipcRenderer} = electron;

ipcRenderer.on('key', (e, m) => console.log(m));
class App extends React.Component {
	render() {
		return <h1>React!</h1>;
	}
}

render(
	<App/>,
	document.querySelector('[data-app]')
);
