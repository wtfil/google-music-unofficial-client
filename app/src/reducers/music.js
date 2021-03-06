import * as actions from '../actions';
const DEFAULT_MUSIC = {
	songs: [],
	playlists: [],
	artists: [],
	albums: []
};

export default function music(state = DEFAULT_MUSIC, action) {
	switch(action.type) {
		case actions.LOAD_RADIO_SUCCESS:
			return {...state, radio: action.data};
		case actions.LOAD_PLAYLISTS_SUCCESS:
			return {...state, playlists: action.data.playlist};
		case actions.LOAD_PLAYLIST_SUCCESS:
			const playlist = {
				...state.playlists.find(item => item.id === action.id),
				tracks: action.data
			};
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
		case actions.LOAD_ALBUM_SUCCESS:
			return {
				...state,
				songs: [...state.songs, ...action.data[0].tracks],
				albums: [...state.albums, action.data[0]]
			};
		case actions.SEARCH_SUCCESS:
		case actions.FEELING_LUCKY:
			return {
				...state,
				songs: [...state.songs, ...action.data.tracks]
			};
		default:
			return state;
	}
}
