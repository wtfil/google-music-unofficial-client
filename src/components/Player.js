import React from 'react';
import {connect} from 'react-redux';

class Audio extends React.Component {
	componentWillMount(props) {
		this.audio = new window.Audio();
		this.onProps(this.props);
	}
	componentWillUnmout() {
		this.audio.stop();
		delete this.audio;
	}
	componentWillReceiveProps(props) {
		this.onProps(props);
	}
	onProps(props) {
		if (props.isPlaying) {
			if (this.audio.src !== props.steamUrl) {
				this.audio.src = props.steamUrl;
			}
			this.audio.play();
		} else {
			this.audio.pause();
		}
	}
	render() {
		return null;
	}
}

@connect(state => state)
export default class Player extends React.Component {
	render() {
		const {music, player} = this.props;
		let currentSong;
		if (player.trackId) {
			currentSong = music.songs.find(item => item.trackId === player.trackId);
		}
		return <footer className="player z-depth-2 collection">
			<Audio {...player} />
			<div className="collection-item valign-wrapper">
				<div className="player__left">
					{currentSong &&
						<div className="player__text">
							<span className="title truncate">{currentSong.track.title}</span>
							<p className="truncate">{currentSong.track.artist} - {currentSong.track.album}</p>
						</div>
					}
					<div className="player__hover-item valign-wrapper">
						<i className="material-icons">thumb_up</i>
						<i className="material-icons right">thumb_down</i>
					</div>
				</div>
				<div className="valign-wrapper">
					<i className="material-icons left">skip_previous</i>
					<i className="material-icons circle orange white-text medium">play_arrow</i>
					<i className="material-icons right">skip_next</i>
				</div>
				<div className="player__right valign-wrapper">
					<i className="material-icons">volume_up</i>
				</div>
			</div>
		</footer>;
	}
}
