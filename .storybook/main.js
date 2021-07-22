const { resolve } = require('path');
const {
  ContextReplacementPlugin,
  DefinePlugin,
  IgnorePlugin,
} = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const path = require('path');

const getLocales = (url) => {
  const file = fs.readFileSync(path.join(__dirname, url));
  const str = [];
  const langs = file.toString().match(/.*:\s{\r?\n/g);
  langs.forEach((item) => {
    str.push(item.match(/[a-z]{2}/g)[0]);
  });
  return str.join('|');
};

const langRegex = getLocales('../i18n/languages.js');

const rules = [
  {
    test: /^((?!styles\.head).)*\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: {
            mode: 'local',
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          sourceMap: true,
          sourceComments: true,
          plugins: [
            require('postcss-partial-import')({}),
            require('postcss-mixins')({}),
            require('postcss-nesting')({}),
            require('postcss-preset-env')({
              stage: 0,
            }),
            require('postcss-functions')({
              functions: {
                rem: px => `${(px / 10)}rem`,
              },
            }),
            require('postcss-for')({}),
          ],
        },
      },
    ],
  },
  {
    test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
    exclude: [/images/],
    options: {
      name: '[path][name]-[hash:6].[ext]',
    },
    loader: 'file-loader',
  },
  {
    test: /\.(png|svg)$/,
    exclude: [/fonts/],
    loader: 'url-loader',
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-react',
      ],
      plugins: [
        'syntax-trailing-function-commas',
        'import-glob',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-import-meta',
        ['@babel/plugin-proposal-class-properties', { loose: false }],
        '@babel/plugin-proposal-json-strings',
      ],
    },
  },
];

const aliases = {
  '@utils': resolve(__dirname, '../src/utils'),
  '@api': resolve(__dirname, '../src/utils/api/'),
  '@constants': resolve(__dirname, '../src/constants'),
  '@shared': resolve(__dirname, '../src/components/shared'),
  '@screens': resolve(__dirname, '../src/components/screens'),
  '@toolbox': resolve(__dirname, '../src/components/toolbox'),
  '@actions': resolve(__dirname, '../src/store/actions'),
  '@store': resolve(__dirname, '../src/store'),
  '@src': resolve(__dirname, '../src'),
};

const addons = [
  new ESLintPlugin({
    context: '../',
  }),
  new IgnorePlugin({ resourceRegExp: /\.\/locale$/ }),
  new DefinePlugin({
    PRODUCTION: JSON.stringify(false),
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[name].css',
  }),
  new ContextReplacementPlugin(/moment[/\\]locale$/, new RegExp(langRegex)),
];

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-postcss',
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
  ],
  webpackFinal: async (config) => {
    if (!config.resolve) config.resolve = {};
    if (!config.plugins) config.plugins = [];
    if (!config.module) config.module = {};
    if (!config.module.rules) config.module.rules = [];
    config.resolve.alias = aliases;
    config.plugins.push(...addons);
    config.module.rules = rules;

    return config;
  },
};
