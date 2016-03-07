import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {setProgress, pausePlay, playNext, playPrev, selectTrack} from '../actions';
import List from '../components/List';

class Audio extends React.Component {
	componentWillMount(props) {
		this.audio = new window.Audio();
		this.onProgress = e => {
			this.props.onProgress(this.audio.currentTime /this.audio.duration);
		};
		this.onEnd = e => this.props.onEnd();
		this.audio.addEventListener('timeupdate', this.onProgress);
		this.audio.addEventListener('ended', this.onEnd);
		this.onProps(this.props);
	}
	componentWillUnmount() {
		this.audio.pause();
		this.audio.removeEventListener('timeupdate', this.onProgress);
		this.audio.removeEventListener('ended', this.onEnd);
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
			if (this.audio.currentTime !== this.audio.duration) {
				this.audio.play();
			}
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
		this.state = {showQueue: false};
	}
	setProgress(e) {
		const progress = e.pageX / e.target.offsetWidth;
		this.props.dispatch(setProgress(progress));
	}
	toggleQueue() {
		this.setState({
			showQueue: !this.state.showQueue
		});
	}

	render() {
		const {music, player, dispatch} = this.props;
		const {showQueue} = this.state;
		let currentSong;
		if (player.trackId) {
			currentSong = music.songs.find(item => item.trackId === player.trackId);
		}
		return <footer className="player">
			<Audio
				{...player}
				progress={player.progress}
				onProgress={progress => dispatch(setProgress(progress))}
				onEnd={e => dispatch(playNext())}
			/>
			<div onClick={::this.setProgress} className="player__progress pointer progress grey lighten-3">
				<div className="determinate orange" style={{width: 100 * player.progress + '%'}}></div>
			</div>
			{showQueue &&
				<div className="player__queue z-depth-2">
					<div className="player__queue-inner">
						<List
							items={player.queue}
							current={player.trackId}
							onSelect={trackId => dispatch(selectTrack(trackId))}
							small
						/>
					</div>
				</div>
			}
			<div className="player__content collection-item valign-wrapper">
				<div className="player__left">
					{currentSong &&
						<div className="player__text">
							<div className="song-title truncate">{currentSong.title}</div>
							<div className="song-artist truncate">{currentSong.artist} - {currentSong.album}</div>
						</div>
					}
					<div className="hide player__hover-item valign-wrapper">
						<i className="material-icons">thumb_up</i>
						<i className="material-icons right">thumb_down</i>
					</div>
				</div>
				<div className="valign-wrapper">
					<i
						className="material-icons left pointer"
						children="skip_previous"
						onClick={e => dispatch(playPrev())}
					/>
					<i
						className={classnames('material-icons circle white-text medium', {'orange pointer': currentSong}, {'grey': !currentSong})}
						children={player.isPlaying ? 'pause' : 'play_arrow'}
						onClick={e => dispatch(pausePlay())}
					/>
					<i
						className="material-icons right pointer"
						children="skip_next"
						onClick={e => dispatch(playNext())}
					/>
				</div>
				<div className="player__right valign-wrapper">
					{player.queue.length ?
						<i className="material-icons pointer" onClick={::this.toggleQueue}>queue_music</i>
						: null
					}
					<i className="material-icons hide">volume_up</i>
				</div>
			</div>
		</footer>;
	}

}
