---
title: Spotify Desktop App with HiDPI Scaling in GNOME 3
excerpt: Spotify Desktop seems to have issues with HiDPI screens in Linux. This post shows how to fix it.
keywords:
  - linux
  - notes
  - tech
authors:
  - dotcs
published_at: "2019-11-12T16:45:00Z"
updated_at: "2019-11-12T16:45:00Z"
---

When using a HiDPI screen, such as the MacBook Pro with Retina display, Spotify Desktop may not automatically detect the correct scaling factor.
I have noticed issues in my Manjaro installation that runs with GNOME 3 Desktop.
Spotify has been installed from the AUR package repository.  
The wrong scaling factor leads to very small font size that is hard to read.

```console
$ spotify --version
Spotify version 1.1.10.546.ge08ef575, Copyright (c) 2019, Spotify Ltd
```

Fortunately there is an option to force Spotify Desktop to use a (hardcoded) scaling factor.
Use the following command and vary the scaling factor in order to find the correct factor first:

```console
$ spotify --force-device-scale-factor=2
```

After the correct value has been found, adjust the desktop entry that GNOME uses to when starting the application via its launcher.
The file lives in `/usr/share/applications/spotify.desktop`:

```ini
[Desktop Entry]
Type=Application
Name=Spotify
GenericName=Music Player
Icon=spotify-client
TryExec=spotify
Exec=spotify --force-device-scale-factor=2 %U
Terminal=false
MimeType=x-scheme-handler/spotify;
Categories=Audio;Music;Player;AudioVideo;
StartupWMClass=spotify
```
