import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { ICreateUserTokenDTO } from '@modules/dtos/ICreateUsersTokensDTO';
import { BadRequestError } from '@shared/errors/BadRequestError';

import { UserTokens } from '../typeorm/entities/UserTokens';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, { expiresDate, refreshToken, userId });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens | undefined> {
    const userToken = this.usersTokens.find(
      (userToken) =>
        userToken.userId === userId && userToken.refreshToken === refreshToken
    );

    return userToken;
  }

  async deleteById(userId: string): Promise<void> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.userId === userId
    );

    if (!userToken) throw new BadRequestError('Token not exists!');

    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByRefreshToken(
    refreshToken: string
  ): Promise<UserTokens | undefined> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.refreshToken === refreshToken
    );

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
