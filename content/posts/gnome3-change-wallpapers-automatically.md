---
title: "GNOME 3: Change wallpaper periodically"
excerpt: This post describes how wallpapers can be automatically changed in GNOME 3 with a simple script and a cronjob.
keywords:
  - linux
  - notes
  - tech
authors:
  - dotcs
published_at: "2019-11-10T18:52:00Z"
updated_at: "2019-11-10T18:52:00Z"
---

If you are using GNOME 3 and you want to periodically change your desktop background using images in a folder, this is for you.

Put this script somewhere and make it executable.

```bash
#!/usr/bin/env bash

# You need to adjust this path
WALLPAPER_FOLDER=/path/to/your/wallpaper/folder

# https://askubuntu.com/a/1073769/277761
PID=$(pgrep gnome-session | tail -n1)
export DBUS_SESSION_BUS_ADDRESS=$(grep -z DBUS_SESSION_BUS_ADDRESS /proc/$PID/environ|cut -d= -f2-)

FILE_PATH=`ls $WALLPAPER_FOLDER | shuf -n 1`
FILE_URI="file://$WALLPAPER_FOLDER/$FILE_PATH"
/usr/bin/gsettings set org.gnome.desktop.background picture-uri $FILE_URI
```

Then create a cronjob that executes this script periodically, e.g. by using this line:

```
*/10 * * * * /path/to/your/file.sh
```

And you're done. Have fun!