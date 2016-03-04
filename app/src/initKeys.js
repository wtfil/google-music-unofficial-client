import {pausePlay} from './actions';
const {ipcRenderer} = electron;

export default function initKeys({dispatch}) {

	ipcRenderer.on('key', (e, data) => {
		switch(data.key) {
			case 'pause': return dispatch(pausePlay());
		}
	});

}
