import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigEnum } from './enum/config.enum';
// import { User } from './user/user.entity';
// import { Profile } from './user/profile.entity';
// import { Roles } from './roles/roles.entity';
// import { Logs } from './logs/logs.entity';

// import { LoggerModule } from 'nestjs-pino';
// import { join } from 'path';
import { LogsModule } from './logs/logs.module';
import ormconfig from 'ormconfig';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: Joi.object({
        DB_PORT: Joi.number().default(3306),
        DB_HOST: Joi.string().ip(),
        DB_TYPE: Joi.string().valid('mysql'),
        DB_DATABASE: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
      }),
    }),
    // 将配置拆出去
    TypeOrmModule.forRoot(ormconfig),
    // 固定写法，使用配置数据来填充数据库参数
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) =>
    //     ({
    //       type: configService.get(ConfigEnum.DB_TYPE),
    //       host: configService.get(ConfigEnum.DB_HOST),
    //       port: configService.get(ConfigEnum.DB_PORT),
    //       username: configService.get(ConfigEnum.DB_USERNAME),
    //       password: configService.get(ConfigEnum.DB_PASSWORD),
    //       database: configService.get(ConfigEnum.DB_DATABASE),
    //       entities: [User, Profile, Roles, Logs],
    //       synchronize: configService.get(ConfigEnum.DB_SYNC),
    //       logging: ['error'],
    //     }) as TypeOrmModuleOptions,
    // }),
    // 写死的方式
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'example',
    //   database: 'testdb',
    //   entities: [],
    //   synchronize: true,
    //   logging: ['error'],
    // }),
    // Pino 日志方法
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     transport: {
    //       targets: [
    //         process.env.NODE_ENV === 'development'
    //           ? {
    //               level: 'info',
    //               target: 'pino-pretty',
    //               options: {
    //                 colorize: true,
    //               },
    //             }
    //           : {
    //               level: 'info',
    //               target: 'pino-roll',
    //               options: {
    //                 file: join('logs', 'log.txt'),
    //                 frequency: 'daily',
    //                 size: '10m',
    //                 mkdir: true,
    //               },
    //             },
    //       ],
    //     },
    //   },
    // }),
    UserModule,
    LogsModule,
  ],
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class AppModule {}
