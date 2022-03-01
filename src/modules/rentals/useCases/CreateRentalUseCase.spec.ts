import { BadRequestError } from '@shared/errors/BadRequestError';

import { RentalsRepositoryInMemory } from '../repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      userId: '12345',
      carId: '12121212',
      expectedReturnDate: new Date(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
  });

  it('should not be able to create a new rental if there is another open to them same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: '12345',
        carId: '12121212',
        expectedReturnDate: new Date(),
      });

      await createRentalUseCase.execute({
        userId: '12345',
        carId: '12121212',
        expectedReturnDate: new Date(),
      });
    }).rejects.toBeInstanceOf(BadRequestError);
  });

});
