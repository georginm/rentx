import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { deleteFile } from '../../../../utils/file';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  avatarUrl: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ userId, avatarUrl }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError('User not exists');

    if (user.avatarUrl) await deleteFile(`./tmp/avatar/${user.avatarUrl}`);

    user.avatarUrl = avatarUrl;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };