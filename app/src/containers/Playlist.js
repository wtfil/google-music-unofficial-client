import React from 'react';
import {connect} from 'react-redux';
import {loadPlaylist, playTrack} from '../actions';
import Row from '../components/Row';


class Item extends React.Component {

	render(props) {
		const {album, artist, title, trackId, onSelect} = this.props;

		return <li className="collection-item avatar">
			<i onClick={e => onSelect(trackId)} className="pointer material-icons circle orange">play_arrow</i>
			<div className="song-title">{title}</div>
			<div className="song-artist">{artist} - {album}</div>
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
		const playlist = this.props.music.playlists.find(p => p.id === id && p.tracks);
		return <div>
			<h5>Playlist</h5>
			<List
				items={playlist.tracks}
				onSelect={id => dispatch(playTrack(id))}
			/>
		</div>;
	}
}
