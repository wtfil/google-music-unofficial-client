import * as actions from '../actions';
const INIT_STATE = {
	suggests: [],
	results: [],
	text: ''
};
export default function search(state = INIT_STATE, action) {
	switch (action.type) {
		case actions.SEARCH_STARTED:
		case actions.LOAD_SUGGEST_START:
			return {
				...state,
				text: action.text
			};
		case actions.LOAD_SUGGEST_SUCCESS:
			return {
				...state,
				suggests: [...state.suggests, {
					text: action.text,
					items: action.data
				}]
			};
		case actions.SEARCH_SUCCESS:
			return {
				...state,
				results: [...state.results, {
					text: action.text,
					...action.data
				}]
			};
	}
	return state;
}
