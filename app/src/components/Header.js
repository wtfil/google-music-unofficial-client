import React from 'react';
import {connect} from 'react-redux';
import {Link, PropTypes} from 'react-router';
import {loadSuggest, iAmFeelingLucky} from '../actions';
import SearchInput from '../components/SearchInput';

@connect(state => state)
export default class Header extends React.Component {
	static contextTypes = {
		history: PropTypes.history
	};

	shouldComponentUpdate(props) {
		return props.search !== this.props.search;
	}

	render() {
		const {dispatch, search} = this.props
		const {history} = this.context;
		const suggest = search.suggests.find(suggest => suggest.text === search.text);
		return <nav>
			<div className="nav-wrapper orange-bg">
				<div className="left hide-on-small-only">
					<SearchInput
						value={search.text}
						suggest={suggest}
						onChange={text => dispatch(loadSuggest(text))}
						onSeach={text => history.pushState({}, '/search/' + text)}
					/>
				</div>
				<ul className="right">
					<li>
						<i
							className="material-icons pointer rotate-on-hover medium"
							children="casino"
							onClick={e => dispatch(iAmFeelingLucky())}
						/>
					</li>
					<li><Link to="/library">Playlists</Link></li>
				</ul>
			</div>
		</nav>;
	}
}
