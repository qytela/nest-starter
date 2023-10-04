import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as Sentry from '@sentry/node';

@Catch()
export class SentryFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const SENTRY_EXCEPTION_CODE = process.env.SENTRY_EXCEPTION_CODE;
    const exceptionCode: number[] = SENTRY_EXCEPTION_CODE.split(',').map((i) =>
      parseInt(i),
    );

    if (exceptionCode.includes(httpStatus)) {
      console.log('Exception Error: ' + exception);
      Sentry.captureException(exception);
    } else {
      console.log('Exception Info: ' + exception);
      Sentry.captureMessage(exception.message, 'info');
    }

    super.catch(exception, host);
  }
}
