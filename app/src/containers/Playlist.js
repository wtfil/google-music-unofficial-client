import React from 'react';
import {connect} from 'react-redux';
import {loadPlaylist, selectTrack, uploadToFolder} from '../actions';
import List from '../components/List';
import Info from '../components/Info';

@connect(state => state)
export default class Library extends React.Component {
	static onEnter(dispatch, props) {
		return dispatch(loadPlaylist(props.params.id));
	}
	render() {
		const {dispatch, player, params: {id}} = this.props;
		const playlist = this.props.music.playlists.find(p => p.id === id && p.tracks);
		if (!playlist) {
			return null;
		}
		return <div>
			<Info
				title={playlist.title}
				tracks={playlist.tracks}
				subTitle='My playlist'
				image={playlist.suggestedPlaylistArtUrl[0]}
				onLoad={() => dispatch(uploadToFolder(playlist.title, playlist.tracks))}
			/>
			<List
				current={player.trackId}
				items={playlist.tracks}
				onSelect={id => dispatch(selectTrack(id))}
			/>
		</div>;
	}
}
