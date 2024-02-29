import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import type { IField, IFile } from '@app/storage/interfaces';

export const FastifyFileInterceptor = (
  fieldName: string,
): Type<NestInterceptor> => {
  class MixinInterceptor implements NestInterceptor {
    async intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest();
      const reqFile = await request.file();

      const fieldData: IField = {};
      Object.keys(reqFile.fields).map((key) => {
        const value = reqFile.fields[key];
        if (value.fieldname !== fieldName) {
          fieldData[value.fieldname] = value.value;
        }
      });

      const file = reqFile.fields[fieldName];
      const fileData: IFile = {
        ...file,
        buffer: await file.toBuffer(),
      };

      request.file = fileData;
      request.field = fieldData;

      return next.handle();
    }
  }

  const interceptor = mixin(MixinInterceptor);
  return interceptor as Type<NestInterceptor>;
};
