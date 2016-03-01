import React from 'react';

class Card extends React.Component {
	render() {
		const images = this.props[this.props.imageField];
		const name = this.props[this.props.nameField];

		return <div className="col l3 m4 s12">
			<div className="gm-card card hoverable">
				<div className="card-image">
					{images.length ?
						<img width={208} height={208} src={images[0]} alt="" /> :
						null
					}
				</div>
				<div className="card-content">
					<div><a className="black-text" href="">
						{name}
					</a></div>
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
