import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { IFileResponse } from '@app/storage/interfaces/file-response.interface';

export const FastifyFile = createParamDecorator(
  (data, context: ExecutionContext): IFileResponse => {
    const request = context.switchToHttp().getRequest();

    return {
      file: request.file,
      field: request.field,
    };
  },
);
