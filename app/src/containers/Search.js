import React from 'react';
import {connect} from 'react-redux';
import {search, selectTrack} from '../actions';
import List from '../components/List';
import Row from '../components/Row';

@connect(state => state)
export default class Artist extends React.Component {
	static onEnter(dispatch, props) {
		return dispatch(search(props.params.text));
	}

	render() {
		const {player, dispatch, search, params: {text}} = this.props;
		const results = search.results.find(item => item.text === text);
		return <div>
			{results.artists &&
				<div>
				<h5>Artist</h5>
				<Row
					items={results.artists}
					basePath="artists"
				/>
				</div>
			}
			{results.albums &&
				<div>
					<h5>Albums</h5>
					<Row
						items={results.albums}
						basePath="albums"
					/>
				</div>
			}
			{results.tracks &&
				<div>
					<h5>Songs</h5>
					<List
						current={player.trackId}
						items={results.tracks}
						onSelect={trackId => dispatch(selectTrack(trackId))}
					/>
				</div>
			}
		</div>;
	}
}
