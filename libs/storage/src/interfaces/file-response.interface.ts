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

export interface IFileResponse {
  file: IFile;
  field: IField;
}
