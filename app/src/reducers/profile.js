import * as actions from '../actions';
const DEFAULT_PROFILE = {
	auth: null
};
export default function profile(state = DEFAULT_PROFILE, action) {
	switch(action.type) {
		case actions.LOGIN_SUCCESS:
			return {...state, auth: action.auth, message: ''};
		case actions.LOGIN_UNSUCCESS:
			return {...state, auth: null, message: action.message};
		default:
			return state;
	}
}

