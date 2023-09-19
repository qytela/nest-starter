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

    let relations = [];
    if (Array.isArray(data) && data.length > 2) {
      relations = data[2];
    }

    const [type, param] = data;
    const value = args.params[param];
    const query = {};

    query[param] = value;
    const entity = await type.findOne({ where: query, include: relations });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  },
);
