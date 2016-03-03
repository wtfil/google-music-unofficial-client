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
				return dispatch({type: LOGIN_UNSUCCESS});
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
	return dispatch => new Promise((resolve, reject) => {
		pm.getPlayListEntries((error, data) => {
			if (error) {
				dispatch({type: LOAD_PLAYLIST_UNSUCCESS, error});
				return reject(error);
			}
			dispatch({type: LOAD_PLAYLIST_SUCCESS, data})
			return resolve(data);
		});
	});

	return dispatch => request({
		dispatch, pm,
		url: 'services/loaduserplaylist?format=jsarray',
		data: `[["",1],["${id}"]]`,
		types: {
			success: LOAD_PLAYLIST_SUCCESS,
			error: LOAD_PLAYLIST_UNSUCCESS
		}
	});
}
