const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');

const ghPages = process.env.DEPLOY_TARGET === 'gh-pages';

const mod = withCSS(withFonts({
  enableSvg: true
}));

module.exports = {
  assetPrefix: ghPages ? '/dotcs.github.io/' : '',
  ...mod,
};
