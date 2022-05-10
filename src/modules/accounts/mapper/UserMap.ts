import { instanceToPlain } from 'class-transformer';

import { IUserResponseDTO } from '@modules/dtos/IUserResponseDTO';

import { User } from '../infra/typeorm/entities/User';

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatarUrl,
    driverLicense,
    getAvatarUrl,
  }: User): IUserResponseDTO {
    const user = instanceToPlain({
      email,
      name,
      id,
      avatarUrl,
      driverLicense,
      getAvatarUrl,
    });

    return user as IUserResponseDTO;
  }
}

export { UserMap };
