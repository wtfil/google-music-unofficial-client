#!/bin/bash
IGNORE="node_modules/(electron-packager|electron-prebuilt|webpack.*|babel.*|react.*|redux.*|.*loader|less)"
IS_MAC=`env | grep Apple`

if [[ $IS_MAC ]]; then
    PLATFORM=darwin
    ICON='./app/icon'
else
    PLATFORM=win32
    ICON='app\icon.ico'
fi

webpack
electron-packager . GoogleMusic \
    --platform=$PLATFORM --arch=x64 --version=0.35.6 --ignore=$IGNORE --icon=$ICON --overwrite

if [[ $IS_MAC ]]; then
    cd GoogleMusic-darwin-x64
    tar -zcvf GoogleMusic.app.tar.gz GoogleMusic.app
fi
