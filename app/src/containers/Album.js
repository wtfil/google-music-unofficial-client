import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {loadAlbum, selectTrack} from '../actions';
import Row from '../components/Row';
import List from '../components/List';
import Info from '../components/Info';

@connect(state => state)
export default class Artist extends React.Component {
	static onEnter(dispatch, props) {
		return dispatch(loadAlbum(props.params.id));
	}
	render() {
		const {music, player, params: {id}, dispatch} = this.props;
		const album = music.albums.find(item => item.id == id);

		return <div>
			<Info
				title={album.name}
				subTitle={album.artist}
				image={album.image}
				tracks={album.tracks}
				year={album.year}
				description={album.description}
			/>
			<List
				current={player.trackId}
				items={album.tracks}
				onSelect={id => dispatch(selectTrack(id))}
			/>
		</div>
	}
}
