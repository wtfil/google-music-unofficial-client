#!/bin/bash
IGNORE="node_modules/((?!(playmusic|crypto-js|node-uuid)).)"
IS_MAC=`env | grep Apple`

if [[ $IS_MAC ]]; then
    PLATFORM=darwin
    ICON='./app/icon'
else
    rm -rf GoogleMusic*
    PLATFORM=win32
    ICON='app\icon.ico'
fi

webpack
electron-packager . GoogleMusic \
    --platform=$PLATFORM --arch=x64 --version=0.35.6 --ignore=$IGNORE --icon=$ICON --overwrite

if [[ $IS_MAC ]]; then
    cd GoogleMusic-darwin-x64
    tar -zcvf GoogleMusic.app.tar.gz GoogleMusic.app
else
    mkdir GoogleMusic
    cp -r GoogleMusic-win32-x64/{content_shell.pak,GoogleMusic.exe,icudtl.dat,locales,natives_blob.bin,node.dll,resources,ui_resources_200_percent.pak,version} GoogleMusic
    powershell "Add-Type -A System.IO.Compression.FileSystem;    [IO.Compression.ZipFile]::CreateFromDirectory('GoogleMusic', 'GoogleMusic.zip')"
    rm -rf GoogleMusic GoogleMusic-win32-x64
fi
