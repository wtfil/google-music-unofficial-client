function sprintf2(n) {
	return n >= 10 ? n : ('0' + n);
}
export default function formatTime(ms) {
	let s = ms / 1000;
	const m = Math.floor(s / 60);
	s -= m * 60;
	return `${sprintf2(m)}:${sprintf2(s)}`;
}
