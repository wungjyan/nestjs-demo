import {
  ArgumentsHost,
  ExceptionFilter,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import * as requestIp from 'request-ip';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: Logger,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}
  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp(); // 上下文
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    // const status = exception.getStatus();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMsg: string = exception['response'] || 'Internal server error';
    if (exception instanceof QueryFailedError) {
      errorMsg = exception.message;
    }

    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      timestamp: new Date().toISOString,
      ip: requestIp.getClientIp(request),
      exception: exception.name,
      error: errorMsg,
    };

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
