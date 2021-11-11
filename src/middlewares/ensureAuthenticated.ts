import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

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
    throw new Error('token missing');
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
      throw new Error('User does not exists!');
    }

    next();
  } catch (error) {
    console.log(error);
    throw new Error('Invalid token!');
  }
}
