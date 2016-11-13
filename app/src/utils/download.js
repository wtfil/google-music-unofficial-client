function request(url) {
	const st = new native.stream.PassThrough();
	native.https.get(url, res => {
		res.pipe(st);
	});
	return st;
}
export default function download(pm, folder, tracks) {
	try {
		native.fs.mkdirSync(dst);
	} catch (e) {}
	const tasks = tracks.map(track => () => new Promise((resolve, reject) => {
		pm.getStreamUrl(track.trackId, (err, url) => {
			if (err) {
				return reject(err)
			}
			const name = track.artist + ' - ' + track.title + '.mp3'
			const fileName = native.path.join(folder, name);
			const tmp = fileName + '__';
			try {
				native.fs.statSync(fileName);
				return resolve();
			} catch (e) {}

			request(url)
				.on('error', reject)
				.pipe(native.fs.createWriteStream(tmp))
				.on('error', reject)
				.on('finish', () => {
					native.fs.renameSync(tmp, fileName);
					resolve();
				});
		})
	}))

	function next() {
		if (!tasks.length) {
			return Promise.resolve();
		}
		const [task] = tasks.splice(0, 1);
		return task().then(next);
	}
	return next();
}
