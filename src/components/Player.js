import React from 'react';

export default class Player extends React.Component {
	render() {
		return <footer className="player z-depth-2 collection">
			<div className="collection-item valign-wrapper">
				<div className="player__left">
					<div className="player__text">
						<span className="title truncate">Be Careful What You Wish For</span>
						<p className="truncate">Memphis May Fire - Between The Lies</p>
					</div>
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
