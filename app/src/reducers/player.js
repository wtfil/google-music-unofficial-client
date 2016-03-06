import * as actions from '../actions';
const DEFAULT_PLAYER = {
	isPlaying: false,
	queue: [],
	screenQueue: [],
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
			return {
				...state,
				trackId: action.trackId,
				queue: state.screenQueue
			};
		case actions.TRACK_PLAYING:
			let queueIndex, i;
			for (i = 0; i < state.queue.length; i ++) {
				if (state.queue[i].trackId === action.trackId) {
					queueIndex = i;
					break;
				}
			}
			return {
				...state,
				isPlaying: true,
				selectedAt: Date.now(),
				trackId: action.trackId,
				queueIndex
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
				screenQueue: action.data
			};
		case actions.LOAD_ARTIST_SUCCESS:
			return {
				...state,
				screenQueue: action.data[0].topSongs
			};
		default:
			return state;
	}
}
