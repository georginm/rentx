import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/dtos/ICreateUserDTO';
import { BadRequestError } from '@shared/errors/BadRequestError';

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
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) throw new BadRequestError('User already Exists');

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
