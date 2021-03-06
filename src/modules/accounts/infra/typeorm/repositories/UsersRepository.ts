import { getRepository, Repository } from 'typeorm';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async create({
    id,
    name,
    email,
    password,
    driverLicense,
    avatarUrl,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      email,
      password,
      driverLicense,
      avatarUrl,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
