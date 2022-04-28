import { UsersRepositoryInMemory } from '@modules/accounts/infra/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/infra/in-memory/UsersTokensRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { ICreateUserDTO } from '@modules/dtos/ICreateUserDTO';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { BadRequestError } from '@shared/errors/BadRequestError';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    dateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driverLicense: '000123',
      email: 'test@mail.com',
      name: 'Test unitary',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@mail.com',
        password: 'wrongpass',
      })
    ).rejects.toEqual(new BadRequestError('Email or password incorrect'));
  });

  it('Should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driverLicense: '000123',
      email: 'valid@mail.com',
      name: 'Test unitary',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrongpass',
      })
    ).rejects.toEqual(new BadRequestError('Email or password incorrect'));
  });
});
