import React from 'react';
import {connect} from 'react-redux';
import {loadPlaylist, playTrack} from '../actions';
import Row from '../components/Row';


class Item extends React.Component {

	render(props) {
		const {track, trackId, onSelect} = this.props;
		if (!track) {
			return null;
		}
		return <li className="collection-item avatar">
			<i onClick={e => onSelect(trackId)} className="pointer material-icons circle orange">play_arrow</i>
			<div className="song-title">{track.title}</div>
			<div className="song-artist">{track.artist} - {track.album}</div>
		</li>;
	}

}

class List extends React.Component {

	render() {
		const {items, ...props} = this.props;
		return <ul className="collection">
			{items && items.map((item, index) => <Item key={index} {...item} {...props} />)}
		</ul>;
	}
}

@connect(state => state)
export default class Library extends React.Component {
	static onEnter(dispatch, props) {
		return dispatch(loadPlaylist(props.params.id));
	}
	render() {
		const {dispatch, params: {id}} = this.props;
		const playlist = this.props.music.playlists.find(p => p.id === id);

		return <div>
			<h3>Playlist</h3>
			<List
				items={playlist.tracks}
				onSelect={id => dispatch(playTrack(id))}
			/>
		</div>;
	}
}
