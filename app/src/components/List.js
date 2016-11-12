import React from 'react';
import cx from 'classnames';
import {Link} from 'react-router';
import formatTime from '../utils/formatTime';

class Item extends React.Component {
	render(props) {
		const {small, current, album, albumId, artist, title, duration, trackId, onSelect, artistId, index} = this.props;
		const isCurrent = current === trackId;

		return <tr className={cx('playlist__item song-title', {current: isCurrent} )}>
			{isCurrent ?
				<td>
					<i className="playlist__number material-icons tiny playlist__note">music_note</i>
				</td> :
				<td className="playlist__number">
					<span className="playlist__index">{index + 1}</span>
					<i
						onClick={e => onSelect(trackId)}
						className="pointer material-icons playlist__icon"
						children="play_arrow"
					/>
				</td>
			}
			<td className={cx("playlist__name", {bold: isCurrent})}>{title}</td>
			{!small && <td className="playlist__duration hide-on-small-only">{formatTime(duration)}</td>}
			<td className="playlist__artist">
				<Link to={'artists/' + artistId}>{artist}</Link>
			</td>
			<td className="playlist__artist hide-on-small-only">
				<Link to={'albums/' + albumId}>{album}</Link>
			</td>
		</tr>;
	}
}

export default class List extends React.Component {
	shouldComponentUpdate(props) {
		return props.items !== this.props.items ||
			props.current !== this.props.current
	}

	render() {
		const {items, ...props} = this.props;
		return <table className="playlist">
			<thead>
				<tr>
					<td className="playlist__number">#</td>
					<td className="playlist__name">NAME</td>
					{!props.small && <td className="playlist__duration hide-on-small-only"><i className="tiny right material-icons">access_time</i></td>}
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
