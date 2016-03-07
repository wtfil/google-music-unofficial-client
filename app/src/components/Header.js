import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {loadSuggest} from '../actions';
import SearchInput from '../components/SearchInput';

@connect(state => state)
export default class Header extends React.Component {
	static contextTypes = {
		history: React.PropTypes.object.isRequire
	};
	render() {
		const {dispatch, search} = this.props
		const {history} = this.context;
		const suggest = search.suggests.find(suggest => suggest.text === search.text);
		return <nav>
			<div className="nav-wrapper orange">
				<form className="left hide-on-small-only">
					<SearchInput
						value={search.text}
						suggest={suggest}
						onChange={text => dispatch(loadSuggest(text))}
						onSuggrestSelect={text => history.pushState(null, '/search/' + text)}
					/>
				</form>
				<ul className="right">
					<li><Link to="/library">Library</Link></li>
					<li><Link to="/radio">Radio</Link></li>
				</ul>
			</div>
		</nav>;
	}
}
