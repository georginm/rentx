import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { ICreateUserDTO } from '@modules/dtos/ICreateUserDTO';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    driverLicense,
    email,
    password,
    id,
    name,
    avatarUrl,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driverLicense,
      email,
      name,
      password,
      id,
      avatarUrl,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
