function sprintf2(n) {
	return n >= 10 ? n : ('0' + n);
}
export default function formatTime(ms) {
	let s = ms / 1000;
	let m = Math.floor(s / 60);
	const h = Math.floor(m / 60);
	s -= m * 60;
	m -= h * 60;
	const suffix = `${sprintf2(m)}:${sprintf2(s)}`;
	return h ? (h + ':' + suffix) : suffix;
}
