export default {
  '/fms-rest/*': {
    target: 'http://sdf.600jit.com',
    changeOrigin: true,
  },
  '/fms-crm-rest/*': {
    target: 'http://saas.800jit.com',
    changeOrigin: true,
  },
  '/fmsfinance-rest/*': {
    target: 'http://saas.800jit.com',
    changeOrigin: true,
  },
  '/fms-base-rest/*': {
    target: 'http://saas.800jit.com',
    changeOrigin: true,
  },
  '/fms-air-rest/*': {
    target: 'http://sdf.600jit.com',
    changeOrigin: true,
  },
  '/dzgcommons-rest/*': {
    target: 'http://sdf.600jit.com',
    changeOrigin: true,
  },
  '/fmsadmin/*': {
    target: 'http://sdf.600jit.com',
    changeOrigin: true,
  },
}