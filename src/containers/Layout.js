import React from 'react';
import Header from '../components/Header';
import Player from '../components/Player';

export default class Layout extends React.Component {
	render() {
		return <main>
			<Header />
			<div className="page">
				{this.props.children}
			</div>
			<Player />
		</main>;
	}
}
