import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsExists', async: true })
class ExistsValidator implements ValidatorConstraintInterface {
  async validate(value: any, args?: ValidationArguments) {
    const [model, column] = args.constraints;

    let where = args.property;
    if (column) where = column;

    if (value) {
      const data = await model.findOne({
        where: { [where]: value },
      });

      if (!data) return false;

      return true;
    }

    return true;
  }

  defaultMessage(args?: ValidationArguments): string {
    return `The selected ${args.property} is invalid`;
  }
}

export function IsExists(constraints?: any[], options?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsExists',
      target: object.constructor,
      propertyName,
      options,
      constraints,
      validator: ExistsValidator,
    });
  };
}
