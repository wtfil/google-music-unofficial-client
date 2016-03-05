import React from 'react';
import {connect} from 'react-redux';
import {loadArtist} from '../actions';

@connect(state => state)
export default class Artist extends React.Component {
	static onEnter(dispatch, props) {
		return dispatch(loadArtist(props.params.id));
	}
	render() {
		const {music, params: {id}} = this.props;
		const artist = music.artists.find(item => item.id === id);
		return <div>
			<img src={artist.image} />
			<p>{artist.description}</p>
			<div>
				{artist.albums.map(item => (
					<div>{item.name}</div>
				))}
			</div>
		</div>;
	}
}
