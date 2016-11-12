import React from 'react';
import {Link} from 'react-router';

class Card extends React.Component {
	render() {
		const props = this.props;
		const name = props.nameField ? props[props.nameField]: props.name;
		let images = props.imageField ? props[props.imageField] : props.image;
		if (Array.isArray(images)) {
			images = images.slice();
			while (images.length < 4) {
				images.push(images[0]);
			}
		}

		return <Link className="grid__item hoverable " to={props.basePath + '/' + props.id}>
			<div className="grid__card">
				<div className='grid__images'>
					{images && Array.isArray(images) &&
						images.map((image, index) =>
							<div
								className='grid__image compact'
								key={index}
								style={{backgroundImage: `url(${image})` }}
							/>
						)
					}
					{images && !Array.isArray(images) &&
						<img className='grid__image' src={images} />
					}
				</div>
				<div className="grid__text">
					{name}
					{props.year && ` - ${props.year}`}
				</div>
			</div>
		</Link>;
	}
}
export default class Row extends React.Component {
	render() {
		const {items, ...props} = this.props;
		return <div className="grid">
			{items.map((item, index) => {
				return <Card
					key={index}
					{...props}
					{...item}
				/>
			})}
		</div>;
	}
}
