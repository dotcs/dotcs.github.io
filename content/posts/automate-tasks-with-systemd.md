---
title: Automate tasks with docker-compose and systemd
excerpt: This article shows how tasks that have been encapsulated in Docker containers can be controlled by systemd timers. In case of an error a separate systemd service is triggered which sends a mail which contains the last view lines from the journal log.
keywords:
  - linux
  - tech
  - notes
authors:
  - dotcs
published_at: "2020-05-22T15:57:00Z"
updated_at: "2020-05-22T15:57:00Z"
---

I have several tasks encapsulated in Docker containers which I need to trigger on a regular basis.
The scheduling can be done with systemd.
Both tools together have proven to be a quite powerful combination.

## Example: Backup service

Let's assume we have a backup service that lives in `/opt/backup`. 
This folder contains a `docker-compose.yaml` file which contains the configuration of a backup service.

We need one systemd unit for the service and one for the timer.
Both are shown below.
The setup is pretty straight forward. 

```ini
# /etc/systemd/system/backup.service
[Unit]
Description=Backup service
Requires=docker.service
After=docker.service

# Send mail in case of an error
OnFailure=status-email-user@%n.service

[Service]
WorkingDirectory=/opt/backup

ExecStart=/usr/local/bin/docker-compose up

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/backup.timer
[Unit]
Description=Timer for backup service
Requires=backup.service

[Timer]
Unit=backup.service

# Time to wait after booting before we run first time
OnBootSec=10min

# Define a calendar event (see `man systemd.time`)
OnCalendar=*-*-* 03:00:00 Europe/Berlin

[Install]
WantedBy=multi-user.target
```

The service unit has a `OnFailure` hook which runs a separate systemd service in case the exit code of the service is non-zero.
This idea comes from the [Arch Wiki][archwiki-systemd-timers].  
The status email service can be configured in a generic way such that it can be re-used in other systemd services as well.

```ini
# /etc/systemd/system/status-email-user@.service
[Unit]
Description=Status Email for %i to user

[Service]
Type=oneshot
ExecStart=/usr/local/bin/systemd-email email@example.com %i
User=nobody
Group=systemd-journal
```

`/usr/local/bin/systemd-email`: 

```bash
#!/bin/sh

/usr/bin/mail -Ssendwait -t <<ERRMAIL
To: $1
From: Monitor (systemd) <alert@example.tld>
Subject: $2
Content-Transfer-Encoding: 8bit
Content-Type: text/plain; charset=UTF-8

$(systemctl status --full "$2")
ERRMAIL
```

Finally the timer needs to be started/enabled as usual:

```bash
systemctl start backup.timer
systemctl enable backup.timer
```

## Show logs

Logs can be read with `journalctl`:

```bash
journalctl -b -u backup.service
```

[archwiki-systemd-timers]: https://wiki.archlinux.org/index.php/Systemd/Timers#As_a_cron_replacement