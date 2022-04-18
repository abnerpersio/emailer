import RequestError from '../errors/RequestError';

export abstract class Controller {
  validate = (data: Record<string, unknown>, validations: string[]) => {
    validations.forEach((item) => {
      if (!data || !data[item]) {
        throw new RequestError(`Invalid value "${data[item]}" for "${item}" field`, 400);
      }
    });
  };
}
