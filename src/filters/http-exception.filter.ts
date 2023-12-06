import {
  ArgumentsHost,
  ExceptionFilter,
  Catch,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(
      '🚀 ~ file: http-exception.filter.ts:11 ~ HttpExceptionFilter ~ exception:',
      exception,
    );
    const ctx = host.switchToHttp(); // 上下文
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    const status = exception.getStatus();

    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      //   path: request.url,
      //   methods: request.method,
      message: exception.message || exception.name,
    });
  }
}
