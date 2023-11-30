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

function createDailyRotateTransports(level: string, filename: string) {
  return new DailyRotateFile({
    level,
    dirname: 'app-logs',
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  });
}

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          transports: [
            consoleTransports,
            ...(configService.get(LogEnum.LOG_ON)
              ? [
                  createDailyRotateTransports('info', 'application'),
                  createDailyRotateTransports('warn', 'error'),
                ]
              : []),
          ],
        } as WinstonModuleOptions;
      },
    }),
  ],
})
export class LogsModule {}
