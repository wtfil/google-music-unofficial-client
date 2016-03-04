import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {
	render() {
		return <nav>
			<div className="nav-wrapper orange">
				<form className="left hide-on-small-only">
					<div className="input-field">
						<input size={40} id="Search" type="search"/>
						<label htmlFor="search"><i className="material-icons">search</i></label>
		    			<i className="material-icons">close</i>
					</div>
				</form>
				<ul className="right">
					<li><Link to="/library">Library</Link></li>
					<li><Link to="/radio">Radio</Link></li>
				</ul>
			</div>
		</nav>;
	}
}
