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
	return dispatch => request({
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

export function playNext() {
	return (dispatch, getState) => {
		const {player} = getState();
		const track = player.queue[player.queueIndex + 1];
		if (track) {
			playTrack(track.trackId)(dispatch, getState);
		} else {
			dispatch({type: TRACK_PAUSE});
		}
	}
}

export function playPrev() {
	return (dispatch, getState) => {
		const {player} = getState();
		const track = (Date.now() - player.selectedAt < 2000 && player.queueIndex > 0) ?
			player.queue[player.queueIndex - 1] :
			player.queue[player.queueIndex];

		playTrack(track.trackId)(dispatch, getState);
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
