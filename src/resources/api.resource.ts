export class ApiResource<T> {
  constructor(
    public data: T,
    public status: boolean = true,
    public message: string = 'OK',
  ) {}
}
