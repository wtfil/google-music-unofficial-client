import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {authorize} from '../actions';
import Login from './Login'

@connect(state => state)
export default class Authorization  extends React.Component {
	static onEnter(dispatch) {
		return dispatch(authorize());
	}
	render() {
		const {profile, children = null} = this.props;
		return profile.auth ? children : <Login />;
	}
}
