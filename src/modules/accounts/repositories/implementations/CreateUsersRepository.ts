import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    username,
    email,
    password,
    driverLicense,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      email,
      password,
      driverLicense,
    });

    this.repository.save(user);
  }
}

export { UserRepository };
