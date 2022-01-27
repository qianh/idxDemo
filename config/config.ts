import { defineConfig } from 'umi';
import theme from '../src/theme';
import routes from './routes';
import proxy from './proxy';
import packageJSON from '../package.json';
const { dependencies = {} } = packageJSON;
const hasDzgDependencis = Object.keys(dependencies).find(k => k.startsWith('@dzg/'));

const os = require('os');
const WORKER_LENGTH = os.cpus().length - 1;

const config = defineConfig({
  routes,
  nodeModulesTransform: {
    type: 'none'
  },
  terserOptions: {
    parallel: true,
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-source-map',
  chainWebpack: function(config: any, { webpack }: any) {
    if (process.env.NODE_ENV === 'production') {
      config.merge({
        optimization: {
          minimize: true,
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              reactVendor: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: 'reactVendor',
                enforce: true,
                priority: 5,
              },
              antd: {
                test: /[\\/]node_modules[\\/](antd)[\\/]/,
                name: 'antd',
                enforce: true,
                priority: 4,
              },
              umiVendor: {
                test: /[\\/]node_modules[\\/](umi).*[\\/]/,
                name: 'umiVendor',
                enforce: true,
                priority: 3,
              },
              ...(hasDzgDependencis
                ? {
                    dzgVendors: {
                      name: 'dzgVendors',
                      enforce: true,
                      priority: 2,
                      test: /[\\/]node_modules[\\/](@dzg)[\\/]/,
                    },
                  }
                : {}),
              vendors: {
                name: 'vendors',
                enforce: true,
                priority: 1,
                test: /[\\/]node_modules[\\/]((?!(@dzg|antd|react|react-dom|umi)).*)[\\/]/,
              },
              default: {
                test: /[\\/]src[\\/]((?!(pages)).*)[\\/]/,
                name: 'default',
                enforce: true,
              },
            },
          },
        },
      });
    }
    config.module
      .rule('js')
      .use('thread-loader')
      .loader('thread-loader')
      .options({ workers: WORKER_LENGTH })
      .before('babel-loader')
      .end();
  },
  antd: {},
  title: 'demo',
  chunks:
    process.env.NODE_ENV === 'production' ? [
      'reactVendor', 
      'antd', 
      'umiVendor', 
      ...(hasDzgDependencis ? ['dzgVendors'] : []),
      'vendors', 
      'default', 
      'umi'
    ]
    : ['umi'],
  history: { type: 'hash' },
  hash: true,
  publicPath: '/demo/',
  proxy,
  ignoreMomentLocale: true,
  copy: ['static'],
    theme: theme,
  mountElementId: 'demo',
  targets: {
    chrome: 80,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
});

export default config;
