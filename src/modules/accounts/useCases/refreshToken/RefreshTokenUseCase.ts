import { verify, sign } from 'jsonwebtoken';
import { inject } from 'tsyringe';

import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import UnauthorizedError from '@shared/errors/UnauthorizedError';

interface IPayload {
  sub: string;
  email: string;
}

class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvide')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secretRefreshToken) as IPayload;

    const userId = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token
      );

    if (!userToken) {
      throw new UnauthorizedError('Refresh Token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refreshToken = sign({ email }, auth.secretRefreshToken, {
      subject: sub,
      expiresIn: auth.expiresInRefreshToken,
    });

    const expiresDate = this.dateProvider.addDays(auth.expiresRefreshTokenDays);

    await this.usersTokensRepository.create({
      expiresDate,
      refreshToken,
      userId,
    });

    return refreshToken;
  }
}

export { RefreshTokenUseCase };
