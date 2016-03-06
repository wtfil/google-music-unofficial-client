import React from 'react';
import {Link} from 'react-router';

class Card extends React.Component {
	render() {
		const props = this.props;
		const name = props[props.nameField];
		const images = props.imageField ? props[props.imageField] : props.image;
		const image = Array.isArray(images) ? images[0] : images;

		return <div className="grid__item">
			<div className="card hoverable">
				<div className="card-image">
					{image ?
						<img width={208} height={208} src={image} /> :
						null
					}
				</div>
				<div className="card-content">
					<div><Link className="black-text" to={props.basePath + '/' + props.id}>
						{name}
					</Link></div>
				</div>
			</div>
		</div>;
	}
}
export default class Row extends React.Component {
	render() {
		const {items, ...props} = this.props;
		return <div className="grid">
			<div className="grid__content">
				{items.map((item, index) => {
					return <Card
						key={index}
						{...props}
						{...item}
					/>
				})}
			</div>
		</div>;
	}
}
