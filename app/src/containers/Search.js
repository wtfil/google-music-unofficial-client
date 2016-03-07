import React from 'react';
import {connect} from 'react-redux';
import {search} from '../actions';
import List from '../components/List';
import Row from '../components/Row';

@connect(state => state)
export default class Artist extends React.Component {
	static onEnter(dispatch, props) {
		return dispatch(search(props.params.text));
	}

	render() {
		const {search, params: {text}} = this.props;
		const results = search.results.find(item => item.text === text);
		console.log(results.albums);
		return <div>
			<h5>Artist</h5>
			<Row
				items={results.artists}
				basePath="artists"
			/>
			<h5>Albums</h5>
			<Row
				items={results.albums}
				basePath="albums"
			/>
			<h5>Songs</h5>
			<List items={results.tracks}/>
		</div>;
	}
}
