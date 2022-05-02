import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  userId: string;
  avatarUrl: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ userId, avatarUrl }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new BadRequestError('User not exists');

    if (user.avatarUrl)
      await this.storageProvider.delete(user.avatarUrl, 'avatar');

    await this.storageProvider.save(avatarUrl, 'avatar');

    user.avatarUrl = avatarUrl;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
