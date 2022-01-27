import * as SentryUtils from '@dzg/sentry-utils';

if (process.env.NODE_ENV !== 'development') {
  const packageJson = require('../package.json');
  const packageName = packageJson.name;
  const { client } = SentryUtils.init({
    dsn: '',
    environment: process.env.NODE_ENV,
    release: process.env.UMI_APP_VERSION,
    packageName,
  });
}
 