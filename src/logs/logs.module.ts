import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule, WinstonModuleOptions, utilities } from 'nest-winston';
import * as winston from 'winston';
import { Console } from 'winston/lib/winston/transports';

import * as DailyRotateFile from 'winston-daily-rotate-file';
import { LogEnum } from 'src/enum/config.enum';

const consoleTransports = new Console({
  format: winston.format.combine(
    winston.format.timestamp(),
    utilities.format.nestLike(),
  ),
});

const dailyInfoTransports = new DailyRotateFile({
  level: 'info',
  dirname: 'app-logs',
  filename: 'info-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
  ),
});

const dailyWarnTransports = new DailyRotateFile({
  level: 'warn',
  dirname: 'app-logs',
  filename: 'warn-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
  ),
});

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          transports: [
            consoleTransports,
            ...(configService.get(LogEnum.LOG_ON)
              ? [dailyInfoTransports, dailyWarnTransports]
              : []),
          ],
        }) as WinstonModuleOptions,
    }),
  ],
})
export class LogsModule {}
