import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
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
  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new UnauthorizedError('token missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    // Verify method must receive secret refresh token
    const { sub: userId } = verify(token, auth.secretRefreshToken) as IPayload;

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(
      userId,
      token
    );

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
