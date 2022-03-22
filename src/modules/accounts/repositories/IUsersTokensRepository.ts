import { ICreateUserTokenDTO } from '@modules/dtos/ICreateUsersTokensDTO';

import { UserTokens } from '../infra/typeorm/entities/UserTokens';

interface IUsersTokensRepository {
  create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository };
