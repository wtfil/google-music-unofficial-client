'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow () {
	mainWindow = new BrowserWindow({width: 800, height: 600});
	mainWindow.loadURL('file://' + __dirname + '/index.html');

	mainWindow.webContents.openDevTools();
	mainWindow.on('closed', function() {
		mainWindow = null;
	});
	const send = data => mainWindow.webContents.send('key', data);
	electron.globalShortcut.register('MediaNextTrack', function() {
		send({key: 'next'});
	});
	electron.globalShortcut.register('MediaPreviousTrack', function() {
		send({key: 'prev'});
	});
	electron.globalShortcut.register('MediaStop', function() {
		send({key: 'stop'});
	});
	electron.globalShortcut.register('MediaPlayPause', function() {
		send({key: 'pause'});
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});
