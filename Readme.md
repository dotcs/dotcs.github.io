# Blog

dotcs's private blog build with Jamstack.

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

First copy the env variable template and fill in your values:

```bash
cp .env.deploy.template .env.deploy.local
vim .env.deploy.local  # fill in your values
```

Deployment is then as simple as running `./admin/deploy-gh-pages.sh`.
