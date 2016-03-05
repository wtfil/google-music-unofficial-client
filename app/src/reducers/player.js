import * as actions from '../actions';
const DEFAULT_PLAYER = {
	isPlaying: false,
	queue: [],
	streamUrl: null,
	trackId: null
};

export default function player(state = DEFAULT_PLAYER, action) {
	switch (action.type) {
		case actions.TRACK_PAUSE_PLAY:
			return {
				...state,
				isPlaying: !state.isPlaying
			};
		case actions.TRACK_SELECTED:
			return {
				...state,
				trackId: action.trackId
			};
		case actions.TRACK_LOAD_SUCCESS:
			return {
				...state,
				streamUrl: action.streamUrl,
				isPlaying: state.trackId === action.trackId
			};
		default:
			return state;
	}
}
