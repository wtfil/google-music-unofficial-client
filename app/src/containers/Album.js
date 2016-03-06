import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {loadAlbum, selectTrack} from '../actions';
import Row from '../components/Row';
import List from '../components/List';

@connect(state => state)
export default class Artist extends React.Component {
	static onEnter(dispatch, props) {
		return dispatch(loadAlbum(props.params.id));
	}
	render() {
		const {music, player, params: {id}, dispatch} = this.props;
		const album = music.albums.find(item => item.id == id);

		return <div>
			<div className="card">
				<div className="card-image preview">
					<img src={album.image} />
					<span className="card-title">{album.name}</span>
				</div>
			</div>
			<h5><Link to={'artists/' + album.artistId}>{album.artist}</Link> - {album.name} ({album.year})</h5>
			<List
				current={player.trackId}
				items={album.tracks}
				onSelect={id => dispatch(selectTrack(id))}
			/>
		</div>
	}
}
