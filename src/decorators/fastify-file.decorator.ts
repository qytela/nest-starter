import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IFile {
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
}

export interface IField {
  [key: string]: any;
}

export interface IFastifyFile {
  file: IFile;
  field: IField;
}

export const FastifyFile = createParamDecorator(
  (data, context: ExecutionContext): IFastifyFile => {
    const request = context.switchToHttp().getRequest();

    return {
      file: request.file,
      field: request.field,
    };
  },
);
