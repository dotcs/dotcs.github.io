---
title: Webcam Support in Arch Linux on Macbooks
excerpt: Learn how to install a kernel module that allows to use the Apple Facetime HD camera in your Arch or Manjaro Linux installation.
keywords:
  - linux
  - notes
  - tech
authors:
  - dotcs
published_at: "2020-04-01T18:07:00Z"
updated_at: "2020-04-01T18:07:00Z"
---

I'm running [Manjaro Linux][manjaro] (an [Arch Linux][arch] derivative) on my MacbookPro12,1 (Retina, 13-inch, Early 2015).

![Image source: support.apple.com, 2020/04/01](/posts/<post_slug>/macbook-pro.png)

I was astonished how many things just worked out-of-the-box.
Kudos to the Arch and Manjaro teams for their great work!

Unfortunately one thing that did not work out-of-the-box is the webcam.
It requires a driver that is not part of the official kernel but must be installed separately.  
The code is in the [Arch User Repository (AUR)][arch-aur].
I use [yay][yay] to install packages from AUR which I can highly recommend and which I will use in this article.

Let's get our hands dirty!

First let's get information about all installed kernels and see if the headers are installed for all of them:

```console
$ pacman -Q | grep -E 'linux[0-9]+'  # see which kernels are installed
```

For each installed linux kernel there should be a `-headers` file next to it, e.g.

```
linux419 4.19.113-1
linux419-headers 4.19.113-1
linux54 5.4.28-1
linux54-headers 5.4.28-1
linux55 5.5.13-1
linux55-headers 5.5.13-1
```

If the headers are missing, make sure to install them:

```console
$ yay -S linux-headers   # select the headers that are missing
```

Then let's get the [driver][bcwc-pcie] and install it from AUR:

```console
$ yay -S bcwc-pcie-git
```

After the installation we need to load the kernel module:

```console
$ modprobe facetimehd
```

You can test if the video source has been identified correctly by executing `v4l2-ctl --list-devices`.
If everything worked out, the output should be:

```
Apple Facetime HD (PCI:0000:02:00.0):
	/dev/video0
```

If the output is instead `No /dev/video0 device`, then make sure to unload the kernel module `bdc_pci` as described in the [wiki][bcwc-pcie-wiki].
This can be done by running the following commands:

```bash
modprobe -r facetimehd  # temporary remove facetimehd module
modprobe -r bdc_pci     # remove disturbing kernel module

# make sure that the disturbing kernel module is blacklisted
# and cannot be loaded as a dependency of another module.
echo "blacklist bdc_pci\ninstall bdc_pci /bin/false" > /etc/modprobe.d/bcwc-pcie.conf

modprobe facetimehd     # load the facetimehd module again
```

The webcam should work now.
You can test it on any website that requires a webcam, such as [meet.jit.si][jitsi].
Have fun!

[manjaro]: https://manjaro.org/
[arch]: https://www.archlinux.org/
[arch-aur]: https://aur.archlinux.org/
[yay]: https://github.com/Jguer/yay
[bcwc-pcie]: https://aur.archlinux.org/packages/bcwc-pcie-git/
[bcwc-pcie-wiki]: https://github.com/patjak/bcwc_pcie/wiki#known-issues
[jitsi]: https://meet.jit.si/
