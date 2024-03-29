import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

/**
 * Custom validator for checking uniqueness of a value in a database model.
 */
@ValidatorConstraint({ name: 'IsUnique', async: true })
class UniqueValidator implements ValidatorConstraintInterface {
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

      if (data) return false;

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
    return `The ${args.property} has already been taken`;
  }
}

/**
 * Register decorator.
 * @param {any[]} constraints - Additional constraints for the validator.
 * @param {ValidationOptions} options - Validation options.
 * @returns {Function} A function that registers the decorator.
 */
export function IsUnique(constraints?: any[], options?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName,
      options,
      constraints,
      validator: UniqueValidator,
    });
  };
}
