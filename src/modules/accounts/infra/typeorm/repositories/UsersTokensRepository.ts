import { getRepository, Repository } from 'typeorm';

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { ICreateUserTokenDTO } from '@modules/dtos/ICreateUsersTokensDTO';

import { UserTokens } from '../entities/UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async findByRefreshToken(
    refreshToken: string
  ): Promise<UserTokens | undefined> {
    const userToken = await this.repository.findOne({ refreshToken });

    return userToken;
  }

  async deleteById(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens | undefined> {
    const usersToken = await this.repository.findOne({ userId, refreshToken });

    return usersToken;
  }

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expiresDate,
      refreshToken,
      userId,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UsersTokensRepository };
