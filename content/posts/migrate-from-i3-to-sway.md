---
title: Migrate from i3 to sway
excerpt: This post describes my migration from i3 (X.org Server) to Sway (Wayland).
keywords:
  - linux
  - notes
authors:
  - dotcs
published_at: "2020-11-15T09:52:00Z"
updated_at: "2020-11-19T21:13:28+01:00"
---

I recently changed from the Linux display server protocol [X.org Server][xserver] to [Wayland][wayland] on one of my machines.
My favorite window manager [i3] is not compatible with Wayland though, so I had to search for an alternative.
Luckily there is a drop-in replacement for i3 available which is named [Sway][sway].

Sway is very similar to i3, it even uses the same syntax for the config, so the change required only a few tweaks which I will now talk about.
I can also recommend to read the [Sway article on the Arch Wiki][sway-archwiki].

At this let's take a brief moment to say "Thank you" to all contributors of Sway and Wayland and maintainers of the corresponding packages in the various distros out there. ♥

## Installation

Installation of sway under Arch Linux is easy.
It's as simple as:

```bash
yay -S sway
```

## Copy configuration

Sway searches it's configuration in `~/.config/sway/config` so I copied my i3 config there.
All changes go into this config file.

## Adjust configuration

After the configuration has been copied use a separate TTY to try our sway and its configuration.
Remember that `<SUPER> + SHIFT + c` does reload your configuration which is quite handy for trying things out.
Also `swaymsg` can be used to send messages to sway, so for example the following command would set the scaling 2 for all output devices.

```
swaymsg output "*" scale 2
```

### Screen output resolution

I'm working with a HiDPI screen which was detected correctly in Sway.
But I found the scaling factor of 2, which is the default in HiDPI screens, too much.
Although it's not recommended to use float values here, I found a scaling factor of 1.3 to fit my needs, so I added this line to my config:

```
# Screen scaling (default is 2)
output eDP-1 scale 1.3
```

To list connected displays use `swaymsg -t get_outputs` which in my case now (after the change) shows as:

```console
$ swaymsg -t get_outputs   
Output eDP-1 'Apple Computer Inc Color LCD 0x00000000' (focused)
  Current mode: 2560x1600 @ 59.972000 Hz
  Position: 0,0
  Scale factor: 1.300000
  Scale filter: linear
  Subpixel hinting: unknown
  Transform: normal
  Workspace: 4
  Max render time: off
  Adaptive sync: disabled
  Available modes:
    2560x1600 @ 59.972000 Hz
```

### Background images with automatic rotation

I like to have randomly chosen background images that change every now and then.
Sway makes it easy to implement this.
I added the following line to my config which executes a script during start.

```
exec --no-startup-id ~/.local/scripts/sway-rotate-bg-image.sh
```

The script itself doesn't do much.
It lists all files in a certain folder, shuffles the names and selects one of them.
It updates the background on all attached displays image via `swaymsg` and then pauses for 300 seconds (=5min) before the next iteration.

```bash
#!/usr/bin/env bash
IMG_DIR=~/wallpapers
while true;
do
    IMG=`ls -t1 $IMG_DIR/* | shuf | head -n 1`
    swaymsg output "*" bg $IMG fill; sleep 300
done
```

### Detect idle state and lock screen

To automatically lock the screen there are luckily two programs available that do the heavy-lifting.
They are called swayidle and swaylock and can be installed in Arch via:

```bash
yay -S swayidle swaylock
```

The following script is taken from the `swayidle` manpage:

> This will lock your screen after 300 seconds of inactivity, then turn off your displays after another 300 seconds, and turn your screens back on when resumed. It will also lock your screen before your computer goes to sleep.
>
> To make sure swayidle waits for swaylock to lock the screen before it releases the inhibition lock, the -w options is used in swayidle, and -f in swaylock.

```
exec --no-startup-id swayidle -w \
    timeout 300 'swaylock -f -c 000000' \
    timeout 600 'swaymsg "output * dpms off"' \
    resume 'swaymsg "output * dpms on"' \
    before-sleep 'swaylock -f -c 000000'
```

### Screen backlight keys

In my i3 setup I used `xbacklight` to change the backlight of my screen.

```
bindsym XF86MonBrightnessUp exec xbacklight +10
bindsym XF86MonBrightnessDown exec xbacklight -10
```

This of course won't work anymore in Wayland, so I replaced the old configuration with `brightnessctl` which needs to be installed first:

```bash
yay -S brightnessctl
```

The syntax of `brightnessctrl` differs slightly:

```
bindsym XF86MonBrightnessDown exec brightnessctl set 5%-
bindsym XF86MonBrightnessUp exec brightnessctl set +5%
```

### Keyboard bindings

For me one key on the keyboard is completely superfluous: capslock.
In my systems I either deactivate this key or map it to ESC if possible.
Having ESC closer to the home row is benefitial to me - especially when working a lot with vim.
This can done with xkb_options.

Another interesting setting is the key repeat delay and rate, which can be tuned also quite easily.

```
input "type:keyboard" {
    # Capslock key should work as escape key
    xkb_options caps:escape

    repeat_delay 350
    repeat_rate 45
}
```

### SSH Agent

To automatically start the SSH agent I use a systemd service which is placed in `~/.config/systemd/user/ssh-agent.service`:

```ini
[Unit]
Description=SSH key agent

[Service]
Type=simple
Environment=SSH_AUTH_SOCK=%t/ssh-agent.socket
# DISPLAY required for ssh-askpass to work
Environment=DISPLAY=:0
ExecStart=/usr/bin/ssh-agent -D -a $SSH_AUTH_SOCK

[Install]
WantedBy=default.target
```

Also configure the pam environment in `~/.pam_environment`:

```bash
SSH_AUTH_SOCK DEFAULT="${XDG_RUNTIME_DIR}/ssh-agent.socket"
```

Then start the service and enable it for future system starts: `systemctl --user enable --now ssh-agent.service`.

### Exit script

Finally I updated my exit script that allows me to lock my screen, suspend, shutdown or reboot my machine, etc.

The Sway configuration looks as this

```
set $mode_system System (1) lock, (e) logout, (s) suspend, (h) hibernate, (r) reboot, (d) shutdown
mode "$mode_system" {
    bindsym l exec --no-startup-id ~/.local/scripts/sway-exit.sh lock, mode "default"
    bindsym e exec --no-startup-id ~/.local/scripts/sway-exit.sh logout, mode "default"
    bindsym s exec --no-startup-id ~/.local/scripts/sway-exit.sh suspend, mode "default"
    bindsym h exec --no-startup-id ~/.local/scripts/sway-exit.sh hibernate, mode "default"
    bindsym r exec --no-startup-id ~/.local/scripts/sway-exit.sh reboot, mode "default"
    bindsym d exec --no-startup-id ~/.local/scripts/sway-exit.sh shutdown, mode "default"
    # back to normal: Enter or Escape
    bindsym Return mode "default"
    bindsym Escape mode "default"
}
```

which utilizes the script located in `~/.local/scripts/sway-exit.sh`

```bash
#!/bin/sh
lock() {
    swaylock -f -c 000000
}

case "$1" in
    lock)
        lock
        ;;
    logout)
        swaymsg exit
        ;;
    suspend)
        lock && systemctl suspend
        ;;
    hibernate)
        lock && systemctl hibernate
        ;;
    reboot)
        systemctl reboot
        ;;
    shutdown)
        systemctl poweroff
        ;;
    *)
        echo "Usage: $0 {lock|logout|suspend|hibernate|reboot|shutdown}"
        exit 2
esac

exit 0
```

### Notifications

In i3 I used [dunst] to handle notifications.
Unfortunately it's not [yet ready][dunst-264] to work with wayland.
I found [mako] to be a good replacement.  
Using `mako` is dead simple. 
After installation an additional line `exec mako` in the sway config file does the job.



[i3]: https://i3wm.org/
[xserver]: https://en.wikipedia.org/wiki/X.Org_Server
[wayland]: https://en.wikipedia.org/wiki/Wayland_(display_server_protocol) 
[sway]: https://swaywm.org/
[sway-archwiki]: https://wiki.archlinux.org/index.php/Sway
[dunst]: https://dunst-project.org/
[dunst-264]: https://github.com/dunst-project/dunst/issues/264
[mako]: https://github.com/emersion/mako