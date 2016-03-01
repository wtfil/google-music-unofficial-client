import * as actions from './actions';
const DEFAULT_PROFILE = {
	auth: null
};
const DEFAULT_MUSIC = {
};

export function profile(state = DEFAULT_PROFILE, action) {
	switch(action.type) {
		case actions.LOGIN_SUCCESS:
			return {...state, auth: action.auth};
		case actions.LOGIN_UNSUCCESS:
			return {...state, auth: null};
		default:
			return state;
	}
}

export function music(state = DEFAULT_MUSIC, action) {
	console.log(action);
	switch(action.type) {
		case actions.LOAD_RADIO_SUCCESS:
			return {...state, radio: action.data};
		default:
			return state;
	}
}
