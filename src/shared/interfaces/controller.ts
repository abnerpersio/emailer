import RequestError from '../errors/RequestError';

export default class Controller {
  validate = (data: any, validations: string[]) => {
    validations.forEach((item) => {
      if (!data || !data[item]) {
        throw new RequestError(
          `Invalid value "${data[item]}" for "${item}" field`,
          400,
        );
      }
    });
  };
}