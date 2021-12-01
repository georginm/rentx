import { Request, Response, NextFunction } from 'express';

import { AppError } from '@shared/errors/AppError';

export default // eslint-disable-next-line @typescript-eslint/no-unused-vars
(err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
};
