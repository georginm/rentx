import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    driverLicense,
    password,
  }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name,
      email,
      driverLicense,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
