import React from 'react';

export default class Audio extends React.Component {
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
