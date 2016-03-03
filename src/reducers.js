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
	switch(action.type) {
		case actions.LOAD_RADIO_SUCCESS:
			return {...state, radio: action.data};
		case actions.LOAD_PLAYLISTS_SUCCESS:
			return {...state, playlists: action.data.playlist};
		case actions.LOAD_PLAYLIST_SUCCESS:
			let playlists = action.data.data.items.reduce((o, item) => {
				let current = o[item.playlistId];
				if (!current) {
					const playlist = state.playlists && state.playlists.find(p => p.id === item.playlistId);
					current = o[item.playlistId] = {
						...playlist,
						id: item.playlistId,
						tracks: []
					};
				}
				current.tracks.push(item);
				return o;
			}, {});
			playlists = Object.keys(playlists).map(id => playlists[id]);
			return {...state, playlists};
		default:
			return state;
	}
}
