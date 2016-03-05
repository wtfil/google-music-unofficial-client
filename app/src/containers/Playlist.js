import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import classnames from 'classnames';
import {loadPlaylist, playTrack} from '../actions';
import Row from '../components/Row';
import formatTime from '../utils/formatTime';

class Item extends React.Component {

	render(props) {
		const {current, album, artist, title, duration, trackId, onSelect, artistId, index} = this.props;
		const isCurrent = current === trackId;

		return <tr className={classnames('playlist__item song-title', {current: isCurrent} )}>
			{isCurrent ?
				<td>
					<i className="material-icons tiny playlist__note">music_note</i>
				</td> :
				<td className="playlist__number valign-wrapper">
					<span className="playlist__index">{index + 1}</span>
					<i
						onClick={e => onSelect(trackId)}
						className="pointer material-icons playlist__icon"
						children="play_arrow"
					/>
				</td>
			}
			<td className="playlist__name">{title}</td>
			<td className="playlist__duration grey-text hide-on-small-only">{formatTime(duration)}</td>
			<td className="playlist__artist"><Link to={'artist/' + artistId}>{artist}</Link></td>
			<td className="playlist__artist hide-on-small-only">{album}</td>
		</tr>;
	}

}

class List extends React.Component {

	render() {
		const {items, ...props} = this.props;
		return <table className="playlist">
			<thead>
				<tr>
					<td className="playlist__number">#</td>
					<td className="playlist__name">NAME</td>
					<td className="playlist__duration hide-on-small-only"><i className="tiny right material-icons">access_time</i></td>
					<td className="playlist__artist">ARTIST</td>
					<td className="playlist__artist hide-on-small-only">ALBUM</td>
				</tr>
			</thead>
			<tbody>
				{items && items.map((item, index) => (
					<Item key={index} index={index} {...item} {...props} />
				))}
			</tbody>
		</table>;
	}
}

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
				onSelect={id => dispatch(playTrack(id))}
			/>
		</div>;
	}
}
