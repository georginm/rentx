import { UsersRepositoryInMemory } from '@modules/accounts/infra/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/infra/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { BadRequestError } from '@shared/errors/BadRequestError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');
    await usersRepositoryInMemory.create({
      driverLicense: '027276',
      email: 'lu@ulun.bd',
      name: 'Gary Harrington',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('lu@ulun.bd');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be not able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('notExist@mail.c')
    ).rejects.toEqual(new BadRequestError('User does no exists!'));
  });

  it('should be able to create an users token', async () => {
    const generateToken = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      driverLicense: '446818',
      email: 'iwmusmo@voz.kr',
      name: 'Luke Buchanan',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('iwmusmo@voz.kr');

    expect(generateToken).toHaveBeenCalled();
  });
});
