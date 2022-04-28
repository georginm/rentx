import { ICreateUserTokenDTO } from '@modules/dtos/ICreateUsersTokensDTO';

import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
  create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens | undefined>;

  deleteById(userId: string): Promise<void>;

  findByRefreshToken(refreshToken: string): Promise<UserTokens | undefined>;
}

export { IUsersTokensRepository };
