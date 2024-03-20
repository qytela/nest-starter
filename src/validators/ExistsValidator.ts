import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

/**
 * Custom validator for checking record exists of a value in a database model.
 */
@ValidatorConstraint({ name: 'IsExists', async: true })
class ExistsValidator implements ValidatorConstraintInterface {
  /**
   * Validates whether the given value.
   * @param {any} value - The value to validate.
   * @param {ValidationArguments} args - Validation arguments.
   * @returns {Promise<boolean>} A promise that resolves to true if the validation pass, false otherwise.
   */
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

  /**
   * Returns the error message.
   * @param {ValidationArguments} args - Validation arguments containing property information.
   * @returns {string} The error message.
   */
  defaultMessage(args?: ValidationArguments): string {
    return `The selected ${args.property} is invalid`;
  }
}

/**
 * Register decorator.
 * @param {any[]} constraints - Additional constraints for the validator.
 * @param {ValidationOptions} options - Validation options.
 * @returns {Function} A function that registers the decorator.
 */
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
