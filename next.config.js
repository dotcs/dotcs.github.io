const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');

const debug = process.env.NODE_ENV !== 'production';

const mod = withCSS(withFonts({
  enableSvg: true
}));

module.exports = {
  assetPrefix: !debug ? '/dotcs.github.io/' : '',
  ...mod,
};
