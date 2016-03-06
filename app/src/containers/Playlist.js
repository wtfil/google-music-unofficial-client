import React from 'react';
import {connect} from 'react-redux';
import {loadPlaylist, selectTrack} from '../actions';
import List from '../components/List';

@connect(state => state)
export default class Library extends React.Component {
	static onEnter(dispatch, props) {
		return dispatch(loadPlaylist(props.params.id));
	}
	render() {
		const {dispatch, player, params: {id}} = this.props;
		const playlist = this.props.music.playlists.find(p => p.id === id && p.tracks);
		return <div>
			<h5>Playlist</h5>
			<List
				current={player.trackId}
				items={playlist.tracks}
				onSelect={id => dispatch(selectTrack(id))}
			/>
		</div>;
	}
}
