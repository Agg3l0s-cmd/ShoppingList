#!/bin/bash

cordova build android

path="platforms/android/app/build/outputs/apk/debug/"

if [ -e "$path/ShoppingList.apk" ]; then
    echo "Exists"
else
    mv "$path/app-debug.apk" "$path/ShoppingList.apk"
fi

if [ $1 ]; then
    git add .
    git commit -m $1
    git push -u origin main
else
    echo "npne"
fi