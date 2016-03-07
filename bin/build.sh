#!/bin/bash
IGNORE="node_modules/(electron-packager|electron-prebuilt|webpack.*|babel.*|react.*|redux.*|.*loader|less)"
webpack
electron-packager . GoogleMusic \
	--platform=darwin --arch=x64 --version=0.35.6 --ignore=$IGNORE --icon=./app/icon --overwrite

cd GoogleMusic-darwin-x64
tar -zcvf GoogleMusic.app.tar.gz GoogleMusic.app
