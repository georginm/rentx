import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne(id);
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
