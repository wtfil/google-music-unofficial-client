import React from 'react';
import {connect} from 'react-redux';
import {login} from '../actions';

@connect(state => state)
export default class Login extends React.Component {
	render() {
		const {profile} = this.props;
		return <div className="parallax valign-wrapper">
			<form className="login-form" onSubmit={::this.onSubmit}>
				<div className="center-align">
					<i className="large orange-text material-icons">headset</i>
				</div>
				<input ref="email" type="email" placeholder="Email"/>
				<input ref="password" type="password" placeholder="Password / Application password"/>
				<button className="btn orange" type="submit">Login</button>
				{profile.message &&
					<div>
						<p className="materialize-red-text text-lighten-2">{profile.message}</p>
						<p>You should create the application password if you are using 2 factor authentication. You can do this in google account
							&nbsp;<a target="_blank" href="https://accounts.google.com/b/0/SmsAuthSettings#asps">page</a>
						</p>
					</div>
				}
			</form>
		</div>;
	}

	onSubmit(e) {
		e.preventDefault();
		const email = this.refs.email.value;
		const password = this.refs.password.value;
		this.props.dispatch(login({email, password}))
	}
}

