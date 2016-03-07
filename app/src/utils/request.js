export default function request({pm, dispatch, extendAction, jsarray, url, method, data, types}) {
	return new Promise((resolve, reject) => {
		function error(err) {
			if (types && types.error) {
				dispatch({type: types.error, error: err});
			}
			return reject();
		}
		if (types && types.start) {
			dispatch({type: types.start, ...extendAction});
		}
		pm.request({
			data,
			method: method || 'POST',
			contentType: 'application/json',
			url: pm._webURL + url + '?format=' + (jsarray ? 'jsarray' : 'json')
		}, (err, body) => {
			if (err) {
				return error(err);
			}
			try {
				body = JSON.parse(body);
			} catch (e) {
				return error(e);
			};
			if (jsarray) {
				body = jsArrayToJson(body);
			}
			if (body.success === false) {
				return error(body);
			}
			if (types && types.success) {
				dispatch({type: types.success, data: body, ...extendAction});
			}
			return resolve(body);
		});
	});
}


const schemas = {
	// search result
	15: {
		0: 'tracks',
		1: 'albums',
		2: 'artists',
		5: 'bestMatch'
	},
	// artist
	19: {
		1: 'id',
		2: 'name',
		4: 'albums',
		5: 'image',
		9: 'related',
		10: 'description',
		11: 'topSongs'
	},
	// album
	23: {
		1: 'name',
		2: 'artist',
		3: 'image',
		6: 'tracks',
		7: 'id',
		9: 'year',
		10: 'artistId'
	},
	// track
	64: {
		1: 'title',
		2: 'image',
		3: 'artist',
		4: 'album',
		11: 'ganre',
		13: 'duration',
		32: 'albumId',
		33: 'artistId',
		36: 'previewImage',
		43: 'id',
		50: 'trackId'
	}
};

function jsArrayToJson(data) {
	return data[1].length === 1 ?
		data[1][0].map(parseItem) :
		parseItem(data[1]);
}
function parseItem(item) {
	if (!Array.isArray(item)) {
		return item;
	}

	// this is experimental. works for suggest
	if (item.length == 2) {
		return item[1];
	}
	const fields = schemas[item.length];

	if (!fields && item.filter(Boolean).every(Array.isArray)) {
		return item.map(parseItem);
	}

	if (!fields) {
		return {};
	}
	return item.reduce((o, val, index) => {
		if (index in fields) {
			o[fields[index]] = parseItem(val);
		}
		return o;
	}, {});
}
