import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import UnauthorizedError from '@shared/errors/UnauthorizedError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;
  const userRepository = new UsersRepository();
  const user = await userRepository.findById(id);

  if (!user?.isAdmin) {
    throw new UnauthorizedError("User isn't admin");
  }

  return next();
}
