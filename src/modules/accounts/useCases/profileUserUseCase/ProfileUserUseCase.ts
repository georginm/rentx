import { inject, injectable } from 'tsyringe';

import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUserResponseDTO } from '@modules/dtos/IUserResponseDTO';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO | undefined> {
    const user = await this.usersRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
