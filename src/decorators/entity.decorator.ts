import {
  createParamDecorator,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';

export const Entity = createParamDecorator(
  async (data, req): Promise<PipeTransform<any>[]> => {
    const [args] = req.args;

    if (!Array.isArray(data)) {
      data = [data, Object.keys(args.params)];
    }

    const include = [];
    if (Array.isArray(data) && data.length > 2) {
      include.push(...data[2]);
    }

    const [type, param] = data;
    const value = args.params[param];
    const where = {};

    where[param] = value;
    const entity = await type.findOne({ where, include });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  },
);
