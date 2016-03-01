import React from 'react';
import {connect} from 'react-redux';
import {loadRadio, loadRecent} from '../actions';

class Card extends React.Component {
	render() {
		const {image, name} = this.props
		/*console.log(this.props);*/
		return <div className="col l3 m4 s12">
			<div className="gm-card card hoverable">
				<div className="card-image">
					{image.length ?
						<img width={208} height={208} src={image[0].url} alt="" /> :
						null
					}
				</div>
				<div className="card-content">
					<div><a className="black-text" href="">{name}</a></div>
				</div>
			</div>
		</div>;
	}
}

@connect(state => state)
export default class Home extends React.Component {
	static onEnter(dispatch) {
		return Promise.all([
			dispatch(loadRadio()),
			dispatch(loadRecent())
		]);
	}
	render() {
		const {music} = this.props;
		console.log(music);
		return <div>
			<h3>Radio</h3>
			<div className="row">
				{music.radio.myStation.map((item, index) => <Card key={index} {...item}/> )}
			</div>
		</div>;
	}
}

