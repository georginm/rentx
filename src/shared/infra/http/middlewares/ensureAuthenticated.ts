import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import UnauthorizedError from '@shared/errors/UnauthorizedError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('token missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(
      token,
      'be0df4a8dd91d3d0946aa9205f8320f6'
    ) as IPayload;

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedError('User does not exists!');
    }

    request.user = {
      id: userId,
    };

    next();
  } catch (error) {
    throw new UnauthorizedError('Invalid token!');
  }
}
