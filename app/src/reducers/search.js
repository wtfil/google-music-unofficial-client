import * as actions from '../actions';
const INIT_STATE = {
	suggests: [],
	results: [],
	text: ''
};
export default function search(state = INIT_STATE, action) {
	switch (action.type) {
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
	}
	return state;
}
