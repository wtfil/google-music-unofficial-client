import * as actions from '../actions';
const DEFAULT_MUSIC = {
	songs: [],
	playlists: []
};

export default function music(state = DEFAULT_MUSIC, action) {
	switch(action.type) {
		case actions.LOAD_RADIO_SUCCESS:
			return {...state, radio: action.data};
		case actions.LOAD_PLAYLISTS_SUCCESS:
			return {...state, playlists: action.data.playlist};
		case actions.LOAD_PLAYLIST_SUCCESS:
			const playlist = {id: action.id, tracks: action.data};
			return {
				...state,
				songs: [...state.songs, action.data],
				playlists: [...state.playlists, playlist]
			};
		default:
			return state;
	}
}
