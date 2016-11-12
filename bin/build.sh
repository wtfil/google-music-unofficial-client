#!/bin/bash
IGNORE="node_modules/(electron-packager|electron-prebuilt|webpack.*|babel.*|react.*|redux.*|.*loader|less)"
IS_MAC=`env | grep Apple`

if [[ $IS_MAC ]]; then
    PLATFORM=darwin
else
    PLATFORM=win32
fi

webpack
electron-packager . GoogleMusic \
	--platform=$PLATFORM --arch=x64 --version=0.35.6 --ignore=$IGNORE --icon=./app/icon --overwrite

if [[ $IS_MAC ]]; then
    cd GoogleMusic-darwin-x64
    tar -zcvf GoogleMusic.app.tar.gz GoogleMusic.app
fi
