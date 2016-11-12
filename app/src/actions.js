import request from './utils/request';
const pm = new Playmusic();

function set(key, val) {
	localStorage.setItem(key, JSON.stringify(val));
}
function get(key) {
	try {
		return JSON.parse(localStorage.getItem(key));
	} catch(e) {
		return null;
	}
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_UNSUCCESS = 'LOGIN_UNSUCCESS';
export function authorize() {
	return dispatch => {
		return new Promise((resolve, reject) => {
			const auth = get('google-auth');
			if (!auth) {
				dispatch({type: LOGIN_UNSUCCESS});
				resolve(false);
			}
			pm.init(auth, err => {
				dispatch({
					type: err ? LOGIN_UNSUCCESS : LOGIN_SUCCESS,
					auth
				});
				resolve(!err);
			});
		})
	}
}

export function login(opts) {
	return dispatch => {
		pm.login(opts, (err, data) => {
			if (err) {
				return dispatch({type: LOGIN_UNSUCCESS, message: 'Wrong email or password'});
			}
			set('google-auth', data);
			authorize();
		});
	}
}

export const LOAD_RADIO_SUCCESS = 'LOAD_RADIO_SUCCESS';
export function loadRadio() {
	return dispatch => request({
		dispatch, pm,
		url: 'services/radio/loadradio',
		types: {
			success: LOAD_RADIO_SUCCESS
		}
	});
}

export const LOAD_RECENT_SUCCESS = 'LOAD_RECENT_SUCCESS';
export function loadRecent() {
	return dispatch => request({
		dispatch, pm,
		url: 'services/getephemrecent',
		types: {
			success: LOAD_RECENT_SUCCESS
		}
	});
}

export const LOAD_PLAYLISTS_SUCCESS = 'LOAD_PLAYLISTS_SUCCESS';
export function loadPlaylists() {
	return dispatch => request({
		dispatch, pm,
		url: 'services/loadplaylists',
		types: {
			success: LOAD_PLAYLISTS_SUCCESS
		}
	});
}

export const LOAD_PLAYLIST_SUCCESS = 'LOAD_PLAYLIST_SUCCESS';
export const LOAD_PLAYLIST_UNSUCCESS = 'LOAD_PLAYLIST_UNSUCCESS';
export function loadPlaylist(id) {
	return dispatch => dispatch(loadPlaylists()).then(() => {
		return request({
			dispatch, pm,
			url: 'services/loaduserplaylist',
			jsarray: true,
			data: `[['', 1], [${id}]]`,
			extendAction: {id},
			types: {
				error: LOAD_PLAYLIST_UNSUCCESS,
				success: LOAD_PLAYLIST_SUCCESS
			}
		});
	})
}

export const TRACK_PLAYING = 'TRACK_PLAYING';
export const TRACK_LOAD_UNSUCCESS = 'TRACK_LOAD_UNSUCCESS';
export const TRACK_LOAD_SUCCESS = 'TRACK_LOAD_SUCCESS';
export function playTrack(trackId) {
	return (dispatch, getState) => {
		dispatch({type: TRACK_PLAYING, trackId});
		pm.getStreamUrl(trackId, (err, url) => {
			if (err) {
				return dispatch({type: TRACK_LOAD_UNSUCCESS, error: err});
			}
			dispatch({type: TRACK_LOAD_SUCCESS, trackId, streamUrl: url});
		});
	}
}
export const TRACK_SELECTED = 'TRACK_SELECTED';
export function selectTrack(trackId) {
	return (dispatch, getState) => {
		dispatch({type: TRACK_SELECTED, trackId});
		return playTrack(trackId)(dispatch, getState);
	}
}

export const TRACK_PAUSE_PLAY = 'TRACK_PAUSE_PLAY';
export const TRACK_PAUSE = 'TRACK_PAUSE';
export function pausePlay() {
	return {type: TRACK_PAUSE_PLAY};
}

export const SET_PROGRESS = 'SET_PROGRESS';
export function setProgress(progress) {
	return {type: SET_PROGRESS, progress};
}

export function playNext() {
	return (dispatch, getState) => {
		const {player} = getState();
		const track = player.queue[player.queueIndex + 1];
		if (track) {
			dispatch(playTrack(track.trackId));
		} else {
			dispatch({type: TRACK_PAUSE});
		}
	}
}

export function playPrev() {
	return (dispatch, getState) => {
		const {player} = getState();
		if (player.progress > 1 / 60 || player.queueIndex === 0) {
			return dispatch(setProgress(0));
		}
		const track = player.queue[player.queueIndex - 1];
		dispatch(playTrack(track.trackId));
	}
}


export const LOAD_ARTIST_SUCCESS = 'LOAD_ARTIST_SUCCESS';
export function loadArtist(id) {
	return dispatch => request({
		dispatch, pm,
		url: 'services/fetchartist',
		jsarray: true,
		data: `[['', 1], [[${id}]]]`,
		types: {
			success: LOAD_ARTIST_SUCCESS
		}
	});
}

export const LOAD_ALBUM_SUCCESS = 'LOAD_ALBUM_SUCCESS';
export function loadAlbum(id) {
	return dispatch => request({
		dispatch, pm,
		url: 'services/fetchalbum',
		jsarray: true,
		data: `[['', 1], [[${id}], true]]`,
		types: {
			success: LOAD_ALBUM_SUCCESS
		}
	});
}

export const LOAD_SUGGEST_SUCCESS = 'LOAD_SUGGEST_SUCCESS';
export const LOAD_SUGGEST_START = 'LOAD_SUGGEST_START';
export function loadSuggest(text) {
	return dispatch => request({
		dispatch, pm,
		url: 'services/fetchquerysuggestions',
		jsarray: true,
		data: `[['', 1], [${text}]]`,
		extendAction: {text},
		types: {
			start: LOAD_SUGGEST_START,
			success: LOAD_SUGGEST_SUCCESS
		}
	});
}

export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export function search(text) {
	return dispatch => request({
		dispatch, pm,
		url: 'services/search',
		jsarray: true,
		data: `[['',1],[${text},10,[2,3,1,7,4,5,6,8],1]]`,
		extendAction: {text},
		types: {
			start: SEARCH_STARTED,
			success: SEARCH_SUCCESS
		}
	});
}


export const FEELING_LUCKY = 'FEELING_LUCKY';
export function iAmFeelingLucky() {
	return dispatch => request({
		dispatch, pm,
		url: 'services/radio/fetchradiofeed',
		jsarray: true,
		data: '[["",1],[null,[],null,null,false,[[5,""]],[],null,false]]',
		types: {
			success: FEELING_LUCKY
		}
	}).then(data => {
		dispatch(selectTrack(data.tracks[0].trackId));
	})
}
