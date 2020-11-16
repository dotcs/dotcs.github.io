---
title: An "open" command in Linux
excerpt: This article explains how to configure a command "open" in Linux that behaves similar to the command that macOS provides.
keywords:
  - linux
  - notes
  - tech
authors:
  - dotcs
published_at: "2019-11-11T21:03:00Z"
updated_at: "2019-11-11T21:03:00Z"
---

As a previous macOS user I am used to call `open <anything>` in a terminal to open the current file or folder with the standard tool.
So `open .` would open the current folder while `open file.pdf` would open the PDF in the default PDF viewer.

Today I learned that `xdg-open` serves the same purpose on the Linux desktop. So I configured an alias, to have the same behavior on both systems: 

```bash
alias open="xdg-open &>/dev/null"
```

## Query and set defaults

`xdg-open` is part of [`xdg-utils`][archwiki-xdg-utils], which [describes itself][freedesktop-xdg-utils] as

> xdg-utils is a set of tools that allows applications to easily integrate with the desktop environment of the user, regardless of the specific desktop environment that the user runs.

It's super convenient to change the default application for a given file, say a PDF.
Let's change the default program:

First let's assume we don't know the mime-type of the PDF, which is `application/pdf`.
We can find this type by query all known filetypes:

```console
$ xdg-mime query filetype /path/to/a/file.pdf 
application/pdf
```

Let's see which default application is currently configured for this filetype:

```console
$ xdg-mime query default application/pdf
chromium.desktop
```

If we don't want to use chromium to read PDFs, but for example [zathura] we can change the default application as follows:

```console
$ find /usr/share/applications/ -name '*zathura*'
/usr/share/applications/org.pwmt.zathura-pdf-mupdf.desktop
/usr/share/applications/org.pwmt.zathura.desktop

$ xdg-mime default org.pwmt.zathura.desktop application/pdf

$ xdg-mime query default application/pdf
org.pwmt.zathura.desktop
```

Now PDF files are opened with zathura when using our new `open` command as defined above.

A lot programs bring their own `.desktop` file(s). Files are listed in `/usr/share/appliations` and can be overridden or suplemented with files located in `~/.local/share/applications`. The specification of those files [can be found here][freedesktop-desktop-entry].


[archwiki-xdg-utils]: https://wiki.archlinux.org/index.php/Xdg-utils
[freedesktop-xdg-utils]: https://freedesktop.org/wiki/Software/xdg-utils/
[zathura]: https://pwmt.org/projects/zathura/
[freedesktop-desktop-entry]: https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html#recognized-keys