import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {loadSuggest} from '../actions';

const MAX_SUGGEST = 5;

class SearchInput extends React.Component {
	constructor () {
		super();
		this.state = {
			suggestSelected: -1
		};
	}
	onKeyUp(e) {
		let {suggestSelected} = this.state;

		if (e.key === 'ArrowUp') {
			if (suggestSelected >= 0) {
				suggestSelected --;
			}
		} else if (e.key === 'ArrowDown') {
			if (suggestSelected < Math.min(MAX_SUGGEST, this.props.suggest.items.length) - 1) {
				suggestSelected ++;
			}
		}
		this.setState({suggestSelected})
	}
	onChange(e) {
		this.props.onChange(e.target.value);
	}
	render() {
		const {suggest, value} = this.props;
		const {suggestSelected} = this.state;
		return <div>
			<div className="input-field">
				<input
					value={value}
					onKeyUp={::this.onKeyUp}
					onChange={::this.onChange}
					size={40}
					id="Search"
					type="search"
				/>
				<label htmlFor="search"><i className="material-icons">search</i></label>
				<i className="material-icons">close</i>
			</div>
			{suggest && suggest.items &&
				<div className="search__suggest z-depth-1">
					{suggest.items.slice(0, MAX_SUGGEST).map((item, index) => (
						<div className={classnames('search__suggest-item', {selected: index === suggestSelected})} >{item}</div>
					))}
				</div>
			}
		</div>;
	}
}

@connect(state => state)
export default class Header extends React.Component {
	static contextTypes = {
		history: React.PropTypes.object.isRequire
	};
	render() {
		const {dispatch, search} = this.props
		const suggest = search.suggests.find(suggest => suggest.text === search.text);
		return <nav>
			<div className="nav-wrapper orange">
				<form className="left hide-on-small-only">
					<SearchInput
						onChange={text => dispatch(loadSuggest(text))}
						value={search.text}
						suggest={suggest}
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
