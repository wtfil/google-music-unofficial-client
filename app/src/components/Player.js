import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {pausePlay} from '../actions';

class Audio extends React.Component {
	componentWillMount(props) {
		this.audio = new window.Audio();
		this.audio.addEventListener('timeupdate', e => {
			this.props.onProgress({
				progress: this.audio.currentTime /this.audio.duration
			});
		});
		this.onProps(this.props);
	}
	componentWillUnmount() {
		this.audio.pause();
		delete this.audio;
	}
	componentWillReceiveProps(props) {
		this.onProps(props);
	}
	onProps(props) {
		if (props.isPlaying) {
			if (props.streamUrl && this.audio.src !== props.streamUrl) {
				this.audio.src = props.streamUrl;
			}
			const position = props.progress * this.audio.duration;
			if (Math.abs(position - this.audio.currentTime) > 1) {
				this.audio.currentTime = position;
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
	constructor() {
		super();
		this.state = {
			progress: 0
		};
	}

	onProgress(e) {
		this.setState(e);
	}

	setProgress(e) {
		const progress = e.pageX / e.target.offsetWidth;
		this.setState({progress});
	}

	render() {
		const {music, player, dispatch} = this.props;
		const {progress} = this.state;
		let currentSong;
		if (player.trackId) {
			currentSong = music.songs.find(item => item.trackId === player.trackId);
		}
		return <footer className="player">
			<Audio
				{...player}
				progress={progress}
				onProgress={::this.onProgress}
			/>
			<div onClick={::this.setProgress} className="player__progress pointer progress grey lighten-3">
				<div className="determinate orange" style={{width: 100 * progress + '%'}}></div>
			</div>
			<div className="player__content collection-item valign-wrapper">
				<div className="player__left">
					{currentSong &&
						<div className="player__text">
							<div className="song-title truncate">{currentSong.track.title}</div>
							<div className="song-artist truncate">{currentSong.track.artist} - {currentSong.track.album}</div>
						</div>
					}
					<div className="hide player__hover-item valign-wrapper">
						<i className="material-icons">thumb_up</i>
						<i className="material-icons right">thumb_down</i>
					</div>
				</div>
				<div className="valign-wrapper">
					<i className="material-icons left">skip_previous</i>
					<i
						className={classnames('material-icons circle white-text medium', {'orange pointer': currentSong}, {'grey': !currentSong})}
						children={player.isPlaying ? 'pause' : 'play_arrow'}
						onClick={e => dispatch(pausePlay())}
					/>
					<i className="material-icons right">skip_next</i>
				</div>
				<div className="player__right valign-wrapper">
					<i className="material-icons hide">volume_up</i>
				</div>
			</div>
		</footer>;
	}

}