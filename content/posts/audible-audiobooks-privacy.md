---
title: Privacy and Audible Audiobooks
excerpt: This article mentions privacy concerns of the Amazon Audible platform and discusses how to prevent a lock-in into Amazon's apps in order to gain more privacy.
keywords:
  - linux
  - tech
  - drm
authors:
  - dotcs
published_at: "2020-12-30T22:46:05+01:00"
updated_at: "2021-01-02T19:35:15+01:00"
---

Audible has a lot books available as audiobooks and I think a price of about 10 EUR per book is more than justified.
But unfortunately Audible locks people into their own ecosystem.
Users must use the official Audible app(s) to download and listen to the purchased books.
To my knowledge third party software is not supported.
This has a lot to do with digital right managment (DRM) of course, but the situation also plays into Amazon's cards.
By locking the people into a certain app they can analyze how people listen to the audiobooks.
For example they could answer the following questions about you:

- Which are the audiobooks that you listen to?
- Which audiobooks have you started to hear? Which of them have you finished? Which have you rejected?
- Which chapters have you re-read? Which parts have you skipped?
- and so on

From their privacy information details:

> Automatic information we collect and analyze include:  
> - [...]  
> - content interaction information, such as **content downloads, streams, playback details**, **listening behavior like start and stop points**, **listening duration**, reading behavior on your Kindle devices and apps (so we can provide our WhisperSync for Voice functionality **and award badges based on your listening** and also calculate royalties), and network details for streaming and download quality, including information about your internet service provider;
> 
> <small>[Audible Privacy Information], relevant text has been highlighted by me</small>

I'm wondering if those award badges are mainly there so that Amazon can argue about any privacy concerns that people might have.
At least for me they are not important at all, I would prefer a tracking-free Audible variant and would gladly waive the badges for this.

While it's not possible to prevent Amazon from tracking which Audiobooks are bought, it is possible to stop them from tracking HOW you read them.
Let's see how this can be done.

**Disclaimer**:
This approach breaks the DRM protection of the Audiobooks.
Please make sure that this is legal in your country for the intended purpose.

## Downloading Audiobooks

Audiobooks that you have bought from Audible can be downloaded from your [library](https://www.audible.de/library/titles).
Execute this script in your [browser's console][firefox-execute-console-cmd] to copy all relevant download links into the clipboard.

```js
let links = Array.from(document.querySelectorAll('.adbl-lib-action-download > a[href^="https://cds.audible.de/download"]'))
    .map(el => el.attributes['href'].nodeValue);
let titles = Array.from(document.querySelectorAll('#adbl-library-content-main .bc-list a.bc-link[href^="/pd"]'))
    .map(el => el.innerText);

let data = links.map((href, i) => ({ href, title: titles[i]}));
copy(data);
```

This creates a valid JSON object in your clipboard which contains a list of records with the keys `href` and `title` for each audiobook.
**Don't share the document with anyone as the download links contain your private key.**

```bash
wl-paste > /tmp/audible.json
```

Here I'm using the [wl-paste] (wayland only) command to get the content from the system's clipboard. 
If you're using X11 you might want to replace `wl-paste` with `xsel` or whatever you have installed.
In a second I will also use [jq] to filter the JSON file, make sure to install it also.

If everything worked out, the temporary file you have created should look like this:

```json
[
  {
    "href": "https://cds.audible.de/download?asin=B08KQJ469F&cust_id=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&codec=LC_128_44100_Stereo&source=Audible&type=AUDI",
    "title": "Stille Nacht in der Provence"
  },
  // ....
]
```

<small>

Note that the param `asin` in the link refers to the book and `cust_id` is a customer specific identifier that gives access to the book and should not be shared with anyone.

</small>


Now let's kick off `wget` and download our audiobooks.
Please note that audiobooks are large (~1-2GB per file).
Make sure that you have enough storage available.

```bash
mkdir -p /tmp/audible && cd $_

jq -c '.[]' /tmp/audible.json | while read i; do
    href=$(echo $i | jq -r '.href')
    title=$(echo $i | jq -r '.title')
    wget -O "$title.aax" "$href"
done
```

<small>

In case you want to download the audiobooks in chunks you can also use [jq ranges], e.g. `jq -c '.[:3]'`.

</small>

This will place all your audiobooks as `*.aax` files in the `/tmp/audible` folder.

*Note: If you have a lot audiobooks you might want to consider a different approach that parallelizes the download queries.*

## Convert from aax to m4a

The files contain a DRM protection which prevents users from sharing the files with others.
In this step you will remove the DRM protection.
**Please make sure that this step is allowed by law in your country before proceeding.**

To remove the DRM protection [this respository][inaudible] can be used.
It contains a docker file that comes pre-installed with all dependencies to break the DRM encryption and decrypt the files.
Make sure to have [docker] pre-installed to be able to follow the next steps.

```bash
mkdir -p /tmp/inaudible && $_
git clone https://github.com/ryanfb/docker_inaudible_rainbowcrack .
docker build -t inaudible .

cd /tmp/audible
docker run --rm -v $(pwd):/data inaudible
```

This will read in all aax files, restore the encryption key via brute-force and then decrypt all aax files.
The result will be one m4a and one png artwork file for each aax file.

*Note that this will take additional storage on your disk - approximately the same amount that is needed for the aax files.*

## Listen on Android

To listen to m4a files from an Android device I can highly recommend the [Voice] app from the F-Droid store.
The interface is super clean, the application remembers the playback location and simply does its job - without tracking the user's behavior.
Kudos to Paul Woitaschek for this piece of software!

Upload both, the m4a and png artwork file, to a folder on your device and add this folder to the list of folders that are scanned by Voice and you're done.

## Mission completed 🥳

So these few steps allow you to create a private copy of the audiobooks that you own.
By using m4a files it's up to you to choose what player you want to use.
Using an open source player such as [Voice] helps to be sure that noone is tracking how you read your books.
Let's take our privacy back - step by step.

Oh and since award badges seem to be relevant these days, here is your nerds-love-privacy badge

<span style="font-size: 4em;">🤓</span>

Have fun with it or throw it away, I don't care.

[inaudible]: https://github.com/ryanfb/docker_inaudible_rainbowcrack
[docker]: https://docs.docker.com/get-docker/
[wl-paste]: https://github.com/bugaevc/wl-clipboard
[jq]: https://stedolan.github.io/jq/
[jq ranges]: https://www.systutorials.com/docs/linux/man/1-jq/#lbBX
[Voice]: https://f-droid.org/en/packages/de.ph1b.audiobook/
[Audible Privacy Information]: https://help.audible.com/s/article/audible-privacy-information?language=en_US
[firefox-execute-console-cmd]: https://developer.mozilla.org/en-US/docs/Tools/Browser_Console