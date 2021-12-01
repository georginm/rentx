import { AppError } from './AppError';

export default class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}
