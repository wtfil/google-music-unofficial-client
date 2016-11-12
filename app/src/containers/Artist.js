import React from 'react';
import {connect} from 'react-redux';
import {loadArtist, selectTrack} from '../actions';
import Row from '../components/Row';
import List from '../components/List';
import Info from '../components/Info';

@connect(state => state)
export default class Artist extends React.Component {
	static onEnter(dispatch, props) {
		return dispatch(loadArtist(props.params.id));
	}
	render() {
		const {dispatch, music, player, params: {id}} = this.props;
		const artist = music.artists.find(item => item.id === id);

		return <div>
			<Info
				title={artist.name}
				image={artist.image}
				tracks={artist.topSongs}
				description={artist.description}
			/>
			<div>
				<h5>Albums</h5>
				<Row
					items={artist.albums}
					nameField="name"
					basePath="albums"
				/>
			</div>
			<div>
				<h5>Top songs</h5>
				<List
					current={player.trackId}
					items={artist.topSongs}
					onSelect={id => dispatch(selectTrack(id))}
				/>
			</div>
		</div>;
	}
}
