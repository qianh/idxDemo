const { exec, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const SEPARATOR = process.platform === 'win32' ? ';' : ':';

// 获取git sha-1
const version = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();

async function build() {
  return new Promise((resolve, reject) => {
    const child = exec(
      `cross-env NODE_ENV=production UMI_APP_VERSION=${version} PROGRESS=none BABELRC=on APP_ROOT=./ NODE_OPTIONS=--max_old_space_size=2048 umi build`,
      {
        stdio: 'inherit',
        env: {
          PATH: path.resolve('./node_modules/.bin') + SEPARATOR + process.env.PATH,
        },
      },
      (error, stdout, stderr) => {
        // Callback will be called when process exits..
        console.log('stdout', stdout);
        console.log('stderr', stderr);
        if (error) {
          child.kill();
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
}

const rootdir = process.env.rootdir ? process.env.rootdir : 'dist';

build().then(() => {
  fs.writeFileSync(
    path.join(process.cwd(), 'preuploadwar.sh'),
    `
  #!/bin/sh


export SENTRY_PROJECT="demo"
export SENTRY_ORG="dzg"
export SENTRY_AUTH_TOKEN="cce6f9ff948d40a2b4d66b5c8727baf197348ffe096e45ae9c0bf075bd4c504c"
export SENTRY_URL="http://fem.900jit.com"

# 暂时解决dist目录中存在preuploadwar.sh的问题
rm -rf ./${rootdir}/preuploadwar.sh

# 防止第二次上传时没有map文件，挪动到另一个文件夹
if [ ! -d "./sentry-dist" ]; then
	cp -r ${rootdir} sentry-dist
  rm -rf ./${rootdir}/*.map
fi

sentry-cli releases new "${version}"

sentry-cli \
releases files "${version}" \
upload-sourcemaps "./sentry-dist" \
--url-prefix=~/demo \
--validate

sentry-cli releases finalize "${version}"


echo "preuoloadwar.sh execution succeed"
`.trim(),
    'utf8'
  );
});
