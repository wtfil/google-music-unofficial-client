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
		case actions.TRACK_PAUSE:
			return {
				...state,
				isPlaying: false
			};
		case actions.TRACK_SELECTED:
			let queueIndex, i;
			for (i = 0; i < state.queue.length; i ++) {
				if (state.queue[i].trackId === action.trackId) {
					queueIndex = i;
					break;
				}
			}
			return {
				...state,
				selectedAt: Date.now(),
				queueIndex,
				trackId: action.trackId
			};
		case actions.TRACK_LOAD_SUCCESS:
			return {
				...state,
				streamUrl: action.streamUrl,
				isPlaying: state.trackId === action.trackId
			};
		case actions.LOAD_PLAYLIST_SUCCESS:
			return {
				...state,
				queue: action.data
			};
		default:
			return state;
	}
}
