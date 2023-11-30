import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { ConfigEnum } from 'src/enum/config.enum';

function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  } else {
    return {};
  }
}

function buildConnectionOptions() {
  const defaultConfig = getEnv('.env');
  const envConfig = getEnv(`.env.${process.env.NODE_ENV}`);
  // config 等同于 configService
  const config = { ...defaultConfig, ...envConfig };

  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    entities: [__dirname + '/**/*.entity{.js,.ts}'],
    synchronize: config[ConfigEnum.DB_SYNC],
    logging: ['error'],
  } as TypeOrmModuleOptions;
}

// 这个是系统需要的配置
export const connectionParams = buildConnectionOptions();

// 这个主要是给 typeorm cli 识别的
export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
