import * as actions from '../actions';
const DEFAULT_MUSIC = {
};

export default function music(state = DEFAULT_MUSIC, action) {
	switch(action.type) {
		case actions.LOAD_RADIO_SUCCESS:
			return {...state, radio: action.data};
		case actions.LOAD_PLAYLISTS_SUCCESS:
			return {...state, playlists: action.data.playlist};
		case actions.LOAD_PLAYLIST_SUCCESS:
			const items = action.data.data.items;
			let playlists = items.reduce((o, item) => {
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
			return {
				...state,
				playlists,
				songs: items
			};
		default:
			return state;
	}
}
