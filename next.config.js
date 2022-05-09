/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate');

const withAntdLess = require('next-plugin-antd-less');

module.exports = nextTranslate(
  withAntdLess({
    // optional: you can modify antd less variables directly here
    modifyVars: {
      '@primary-color': 'rgb(44,106,193)',
      '@link-color': 'rgb(255,104,56)',
    },
    // Or better still you can specify a path to a file
    lessVarsFilePath: './styles/variables.less',
    // optional
    lessVarsFilePathAppendToEndOfContent: false,
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {},

    // Other Config Here...
    reactStrictMode: true,
    compiler: {
      styledComponents: true,
    },
    webpack(config) {
      return config;
    },
  }),
);
