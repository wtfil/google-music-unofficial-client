export default function request({pm, dispatch, url, method, data, types}) {
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
        	url: pm._webURL + url
		}, (err, body) => {
			if (err) {
				return error(err);
			}
			try {
				body = JSON.parse(body);
			} catch (e) {
				return error(e);
			};
			if (body.success === false) {
				return error(body);
			}
			if (types && types.success) {
				dispatch({type: types.success, data: body});
			}
			return resolve(body);
		});
	});
}
