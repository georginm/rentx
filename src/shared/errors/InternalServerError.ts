import { AppError } from './AppError';

export default class InternalServerError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}
