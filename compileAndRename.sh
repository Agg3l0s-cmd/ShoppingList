#!/bin/bash

# cordova build android

# path="platforms/android/app/build/outputs/apk/debug/"

# if [ -e "$path/ShoppingList.apk" ]; then
#     echo "Exists"
# else
#     mv "$path/app-debug.apk" "$path/ShoppingList.apk"
#     cp "$path/ShoppingList.apk" "www/apk/"
# fi

st=""

for i in "$@"; do st+="$i "; done

if [ ${#st} ]; then
    git add .
    git commit -m "$st"
    git push -u origin main
else
    echo "npne"
fi