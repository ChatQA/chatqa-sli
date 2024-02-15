import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1707827012796_9416321',
  koa: {
    port: 7001,
  },
  // oss: {
  //   // normal oss bucket
  //   client: {
  //     accessKeyId: 'your access key',
  //     accessKeySecret: 'your access secret',
  //     bucket: 'your bucket name',
  //     endpoint: 'oss-cn-hongkong.aliyuncs.com',
  //     timeout: '60s',
  //   },
  // },
  cors: {
    origin: '*',
  },
} as MidwayConfig;
