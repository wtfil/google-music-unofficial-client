import React from 'react';
import {connect} from 'react-redux';
import {Link, PropTypes} from 'react-router';
import {loadSuggest} from '../actions';
import SearchInput from '../components/SearchInput';

@connect(state => state)
export default class Header extends React.Component {
	static contextTypes = {
		history: PropTypes.history
	};
	render() {
		const {dispatch, search} = this.props
		const {history} = this.context;
		const suggest = search.suggests.find(suggest => suggest.text === search.text);
		return <nav>
			<div className="nav-wrapper orange">
				<div className="left hide-on-small-only">
					<SearchInput
						value={search.text}
						suggest={suggest}
						onChange={text => dispatch(loadSuggest(text))}
						onSeach={text => history.pushState({}, '/search/' + text)}
					/>
				</div>
				<ul className="right">
					<li><Link to="/library">Playlists</Link></li>
					<li><Link to="/radio">Radio</Link></li>
				</ul>
			</div>
		</nav>;
	}
}
