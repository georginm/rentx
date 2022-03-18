import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDataProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDataProvider';
import { BadRequestError } from '@shared/errors/BadRequestError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dataProvider: DayjsDataProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(24, 'hours').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dataProvider = new DayjsDataProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dataProvider
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      userId: '12345',
      carId: '12121212',
      expectedReturnDate: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
  });

  it('should not be able to create a new rental if there is another open to them same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: '12345',
        carId: '12121212',
        expectedReturnDate: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        userId: '12345',
        carId: '12121212',
        expectedReturnDate: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(BadRequestError);
  });

  it('should not be able to create a new rental if there is another open to them same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: '123',
        carId: '12121212',
        expectedReturnDate: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        userId: '321',
        carId: '12121212',
        expectedReturnDate: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(BadRequestError);
  });

  it('should not be able to create a new rental with a invalid date', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: '123',
        carId: '12121212',
        expectedReturnDate: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(BadRequestError);
  });
});
