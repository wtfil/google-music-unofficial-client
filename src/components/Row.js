import React from 'react';
import {Link} from 'react-router';

class Card extends React.Component {
	render() {
		const props = this.props;
		const images = props[props.imageField];
		const name = props[props.nameField];

		return <div className="col l3 m4 s12">
			<div className="gm-card card hoverable">
				<div className="card-image">
					{images.length ?
						<img width={208} height={208} src={images[0]} alt="" /> :
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
		return <div className="row">
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
