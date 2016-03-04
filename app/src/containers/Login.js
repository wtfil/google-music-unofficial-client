import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {login} from '../actions';

@connect(state => state)
export default class Login extends React.Component {
	render() {
		return <form onSubmit={::this.onSubmit}>
			<h3>Login</h3>
			<input ref="email" type="email" placeholder="Email"/>
			<input ref="password" type="password" placeholder="Password"/>
			<button type="submit">Login</button>
			<Link to="/">Home</Link>
		</form>
	}

	onSubmit(e) {
		e.preventDefault();
		const email = this.refs.email.value;
		const password = this.refs.password.value;
		this.props.dispatch(login({email, password}))
	}
}

