import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokenRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new BadRequestError('Token invalid!');
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expiresDate,
        this.dateProvider.dateNow()
      )
    ) {
      throw new BadRequestError('Token Expired!');
    }

    const user = await this.usersRepository.findById(userToken.userId);

    if (!user) throw new BadRequestError('User not found!');

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokenRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
