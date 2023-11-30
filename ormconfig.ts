import { User } from './src/user/user.entity';
import { Profile } from './src/user/profile.entity';
import { Roles } from './src/roles/roles.entity';
import { Logs } from './src/logs/logs.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

// 这个是系统需要的配置
export const connectionParams = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'example',
  database: 'testdb',
  entities: [User, Profile, Roles, Logs],
  synchronize: true,
  logging: ['error'],
} as TypeOrmModuleOptions;

// 这个主要是给 typeorm cli 识别的
export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
