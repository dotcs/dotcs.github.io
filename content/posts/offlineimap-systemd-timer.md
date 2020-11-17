---
title: OfflineIMAP + systemd timer
excerpt: Learn how to setup a systemd timer that regularly fetches new mails from an IMAP server with OfflineIMAP. 
keywords:
  - linux
  - notes
  - tech
authors:
  - dotcs
published_at: "2020-04-01T14:38:00Z"
updated_at: "2020-04-01T14:38:00Z"
---

I use [mutt] to manage my emails and access them from the terminal.
To sync the mails between the IMAP server and mutt I use [OfflineIMAP].

To regularly check for new mails I use a [systemd timer][systemd-timer].
The necessary files can be found [in the official repository][offlineimap-systemd].

Let's clone the repository first and copy all necessary files to `/etc/systemd/user`.

```bash
cd /tmp
git clone --depth 1 git@github.com:OfflineIMAP/offlineimap.git  # a shallow copy is enough
cd offlineimap/contrib/systemd
sudo cp *.{service,timer} /etc/systemd/user/
systemctl --user daemon-reload
cd /tmp && rm -rf /tmp/offlineimap
```

By default the update interval of the timer is set to 15min.
I preferred an update interval of 5 min, which can be easily accomplished.

```console
$ systemctl --user edit offlineimap-oneshot.timer
```

In this file values can be overwritten as such:

```ini
[Timer]
OnUnitInactiveSec=5min
```

Finally it's time to enable and start the timer.

```console
$ systemctl --user enable offlineimap-oneshot.timer # autostart at boot
$ systemctl --user start offlineimap-oneshot.timer  # start now
```

Let's check if the timer is up and running.
`systemctl --user status offlineimap-oneshot.timer` should show that it is up and running and tell how many time is left until the next run:

```
● offlineimap-oneshot.timer - Offlineimap Query Timer
     Loaded: loaded (/usr/lib/systemd/user/offlineimap-oneshot.timer; enabled; vendor preset: enabled)
    Drop-In: /home/dotcs/.config/systemd/user/offlineimap-oneshot.timer.d
             └─override.conf
     Active: active (waiting) since Wed 2020-04-01 16:27:20 CEST; 8min ago
    Trigger: Wed 2020-04-01 16:37:34 CEST; 1min 55s left
   Triggers: ● offlineimap-oneshot.service
```

[mutt]: http://www.mutt.org/
[offlineimap]: https://www.offlineimap.org/
[offlineimap-systemd]: https://github.com/OfflineIMAP/offlineimap/tree/master/contrib/systemd
[systemd-timer]: https://www.freedesktop.org/software/systemd/man/systemd.timer.html