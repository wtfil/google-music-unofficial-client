export default function request({pm, dispatch, extendAction, jsarray, url, method, data, types}) {
	return new Promise((resolve, reject) => {
		function error(err) {
			if (types && types.error) {
				dispatch({type: types.error, error: err});
			}
			return reject();
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


const fields = {
	1: 'title',
	2: 'image',
	3: 'artist',
	4: 'album',
	11: 'ganre',
	36: 'previewImage',
	43: 'id',
	50: 'trackId'
};
function jsArrayToJson(data) {
	return data[1][0].map(parseItem);
}
function parseItem(item) {
	return item.reduce((o, val, index) => {
		if (index in fields) {
			o[fields[index]] = val;
		}
		return o;
	}, {});
}

