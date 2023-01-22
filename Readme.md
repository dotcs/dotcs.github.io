# Blog

[dotcs's private blog][blog] build with Jamstack.

## Getting started

Create a conda environment first

```bash
conda create --prefix ./.conda-env --file conda.txt
npm install
```

Then start the development server

```console
$ npm run dev
```

## Deployment

Deployment happens automatically through a GitHub Actions pipeline that will publish the static page to GitHub pages.


[blog]: https://blog.dotcs.me
