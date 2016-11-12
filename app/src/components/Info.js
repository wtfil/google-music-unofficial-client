import React from 'react';
import formatTime from '../utils/formatTime';

export default class Info extends React.Component {
	render() {
		const {title, tracks, subTitle, image, year, description} = this.props;
		const duration = tracks.reduce((summ, item) => summ + item.duration, 0);
		const attrs = [year, tracks.length + ' songs', formatTime(duration)]
			.filter(Boolean)
			.join(' • ');

		return <div className='info'>
			<img className='info__image' src={image}/>
			<div className='info__content'>
				<span className='info__title'>{title}</span>
				<span className='info__sub-title'>{subTitle}</span>
				<span className='info__attrs'>{attrs}</span>
				<p className='info__description'>{description}</p>
			</div>
		</div>
	}
}
