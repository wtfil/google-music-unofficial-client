import React from 'react';
import {connect} from 'react-redux';
import {loadPlaylists} from '../actions';
import Row from '../components/Row';

@connect(state => state)
export default class Library extends React.Component {
	static onEnter(dispatch) {
		return dispatch(loadPlaylists());
	}
	render() {
		const {music} = this.props;
		return <div>
			<h5>Library</h5>
			<Row
				items={music.playlists}
				imageField="suggestedPlaylistArtUrl"
				nameField="title"
				basePath="playlists"
			/>
		</div>;
	}
}
