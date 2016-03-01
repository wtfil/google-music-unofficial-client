import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(state => state)
export default class Authorization  extends React.Component {
	static contextTypes = {
		history: PropTypes.object.isRequired
	};
	componentWillMount() {
		if (!this.props.profile.login) {
			this.context.history.replaceState(null, '/login');
		}
	}
	render() {
		const {profile, children} = this.props;
		return profile.login ? {children} : null;
	}
}
