import * as actions from '../actions';
const DEFAULT_MUSIC = {
	songs: [],
	userPlaylists: [],
	playlists: [],
	artists: []
};

export default function music(state = DEFAULT_MUSIC, action) {
	switch(action.type) {
		case actions.LOAD_RADIO_SUCCESS:
			return {...state, radio: action.data};
		case actions.LOAD_PLAYLISTS_SUCCESS:
			return {...state, userPlaylists: action.data.playlist};
		case actions.LOAD_PLAYLIST_SUCCESS:
			const playlist = {id: action.id, tracks: action.data};
			return {
				...state,
				songs: [...state.songs, ...action.data],
				playlists: [...state.playlists, playlist]
			};
		case actions.LOAD_ARTIST_SUCCESS:
			return {
				...state,
				artists: [...state.artists, action.data[0]],
				songs: [...state.songs, ...action.data[0].topSongs]
			};
		default:
			return state;
	}
}
