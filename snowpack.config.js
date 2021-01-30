// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
    'src': '/static',
    'public': '/',
    'styles': '/static'
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
    out: 'demo'
  },
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
};
