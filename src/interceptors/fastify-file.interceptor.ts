import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export const FastifyFileInterceptor = (
  fieldName: string,
): Type<NestInterceptor> => {
  class MixinInterceptor implements NestInterceptor {
    async intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest();
      const file = await request.file();

      const field = {};
      Object.keys(file.fields).map((key) => {
        const value = file.fields[key];
        if (value.fieldname !== fieldName) {
          field[value.fieldname] = value.value;
        }
      });

      const getFile = file.fields[fieldName];

      request.file = {
        fieldname: getFile.fieldname,
        filename: getFile.filename,
        encoding: getFile.encoding,
        mimetype: getFile.mimetype,
        buffer: await getFile.toBuffer(),
      };
      request.field = field;

      return next.handle();
    }
  }

  const interceptor = mixin(MixinInterceptor);
  return interceptor as Type<NestInterceptor>;
};
