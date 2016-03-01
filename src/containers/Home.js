import React from 'react';
import {connect} from 'react-redux';
import {loadRadio, loadRecent} from '../actions';
import Row from '../components/Row';

@connect(state => state)
export default class Home extends React.Component {
	static onEnter(dispatch) {
		return Promise.all([
			dispatch(loadRadio()),
			dispatch(loadRecent())
		]);
	}
	render() {
		const {music} = this.props;
		return <div>
			<h3>Radio</h3>
			<Row
				items={this.props.music.radio.myStation}
				imageField="imageUrl"
				nameField="name"
			/>
		</div>;
	}
}

