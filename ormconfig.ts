import { User } from './src/user/user.entity';
import { Profile } from './src/user/profile.entity';
import { Roles } from './src/roles/roles.entity';
import { Logs } from './src/logs/logs.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default {
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
