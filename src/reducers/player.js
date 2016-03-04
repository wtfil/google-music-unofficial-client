import * as actions from '../actions';
const DEFAULT_PLAYER = {
	isPlaying: false,
	steamUrl: null,
	trackId: null
};

export default function player(state = DEFAULT_PLAYER, action) {
	switch (action.type) {
		case actions.TRACK_SELECTED:
			return {
				...state,
				trackId: action.trackId,
				isPlaying: !state.isPlaying
			};
		case actions.TRACK_LOAD_SUCCESS:
			return {
				...state,
				steamUrl: action.streamUrl,
				isPlaying: state.trackId === action.trackId
			};
		default:
			return state;
	}
}
