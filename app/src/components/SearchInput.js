import React from 'react';
import classnames from 'classnames';
const MAX_SUGGEST = 5;

export default class SearchInput extends React.Component {
	constructor () {
		super();
		this.state = {
			suggestSelected: -1,
			open: false
		};
	}
	selectSuggest(suggestSelected) {
		const text = this.props.suggest.items[suggestSelected]
		this.setState({suggestSelected: -1, open: false});
		this.props.onSeach(text);
	}
	onKeyUp(e) {
		let {suggestSelected} = this.state;

		if (e.key === 'ArrowUp') {
			if (suggestSelected >= 0) {
				suggestSelected --;
			}
			this.setState({suggestSelected})
		} else if (e.key === 'ArrowDown') {
			if (suggestSelected < Math.min(MAX_SUGGEST, this.props.suggest.items.length) - 1) {
				suggestSelected ++;
			}
			this.setState({suggestSelected})
		} else if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			const text = suggestSelected === -1 ?
				this.props.value : this.props.suggest.items[suggestSelected]
			this.props.onSeach(text);
		}
	}

	onChange(e) {
		this.props.onChange(e.target.value);
		this.setState({open: true});
	}

	onFocus(e) {
		this.setState({open: true});
	}

	onBlur(e) {
		this.blurTimeout = setTimeout(() => {
			this.setState({open: false, suggestSelected: -1});
		}, 300);
	}

	componentWillUnmount() {
		clearTimeout(this.blurTimeout);
	}

	componentWillReceiveProps(props) {
		if (props.value !== this.props.value) {
			this.setState({suggestSelected: -1});
		}
	}
	render() {
		const {suggest, value} = this.props;
		const {open, suggestSelected} = this.state;
		return <div>
			<div className="input-field">
				<input
					value={value}
					onFocus={::this.onFocus}
					onBlur={::this.onBlur}
					onKeyUp={::this.onKeyUp}
					onChange={::this.onChange}
					size={40}
					id="Search"
					type="search"
				/>
				<label htmlFor="search"><i className="material-icons">search</i></label>
				<i className="material-icons">close</i>
			</div>
			{open && suggest && suggest.items &&
				<div className="search__suggest z-depth-1">
					{suggest.items.slice(0, MAX_SUGGEST).map((item, index) => (
						<div
							className={classnames('search__suggest-item', {selected: index === suggestSelected})}
							children={item}
							key={index}
							onClick={e => this.selectSuggest(index)}
						/>
					))}
				</div>
			}
		</div>;
	}
}

