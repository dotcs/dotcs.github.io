---
title: How to deploy a Next.js application to GitHub pages
excerpt: In this post I discuss which tweaks are necessary to deploy a Next.js project exported as static HTML files to GitHub pages. 
keywords:
  - tech
  - notes
  - next.js
authors:
  - dotcs
published_at: "2020-11-16T22:56:02+01:00"
updated_at: "2020-11-17T08:40:38+01:00"
---

[Next.js] is becoming very popular - for good reasons.
To me it's one of the best frameworks out there to create all kinds of web pages that are based on [React].
Since Next.js does allow for full server-side rendering and [static html exports][next-static], pages can be rendered completely on the server and delivered to the client as dump static HTML pages with a little bit of CSS and JavaScript where needed.
This makes them perfectly suitable to be hosted on [GitHub pages][github-pages].

My first thought was: Yeah, easy let's do this quickly.
But not so fast!
I've leared that there are a few things that require tweaks.

## Use GitHub Actions to build and export Next.js pages

I use GitHub actions to build the static pages.
The corresponding project setting is set to deliver pages from the `gh-pages` branch.

![GitHub Pages settings to deliver from branch gh-pages](/posts/<post_slug>/github-pages-settings.png)

The corresponding `.github/workflows/gh-pages.yml` is simple.
Note that the `npm run export` script has an enviroment variable `DEPLOY_TARGET: gh-pages` attached to it.
This env variable will be used in the second step.
In the deploy step the branch is set to `gh-pages` and we deliver results from the `out` folder, which is the default target folder for the `next export` command.

Also note that the pipelie creates the (empty) file `out/.nojekyll`.
This is necessary to bypass Jekyll processing on GitHub pages as mentioned [here][gh-pages-jekyll].
Otherwise folders that start with an underscore are ignored, but Next.js puts merged assets, e.g. CSS and JS files, into a folder `_next`. 😵

```yaml
name: Build and Deploy
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2.3.1
        with:
          persist-credentials: false

      - name: Install and Build
        uses: actions/setup-node@v1
      - run: npm install
      - run: npm run build     # runs `next build`
      - run: npm run export    # runs `next export`
        env:
          CI: true
          DEPLOY_TARGET: gh-pages
      - run: touch out/.nojekyll

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@3.7.1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          BRANCH: gh-pages  # The branch the action should deploy to.
          FOLDER: out       # The folder the action should deploy.
          CLEAN: true       # Automatically remove deleted files from the deploy branch
```


## Rewrite paths to static files

When serving websites via `<username>.github.io` any static assets must point to `<username>.github.io/<projectname>` with `<projectname>` being the name of the repository (typically again `<username>.github.io`).
GitHub Pages rewrites some paths internally, so that they **appear** to come from `<username>.github.io`, but things will not work out if the `<projectname>` part is missing.

`next export` allows to set a `assetPrefix`, which tweaking the URL paths and re-write them from `/` to `/<assetPrefix>/`.
This can be configured in the project's `next.config.js`:

```js
const ghPages = process.env.DEPLOY_TARGET === 'gh-pages';

module.exports = {
  assetPrefix: ghPages ? '/dotcs.github.io/' : ''   // customize this value
};
```

With this line in place we detect if we're executed by the GitHub Action runner and re-write paths accordingly.

## Success

With those tweaks Next.js pages can be hosted via GitHub pages easily.
You just need to be aware of them. 😉


[next.js]: https://nextjs.org
[react]: https://reactjs.org
[next-static]: https://nextjs.org/docs/advanced-features/static-html-export
[redux]: https://redux.js.org
[react-hooks]: https://reactjs.org/docs/hooks-intro.html
[github-pages]: https://pages.github.com
[gh-pages-jekyll]: https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/