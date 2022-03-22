import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/infra/in-memory/CarsRepositoryInMemory';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { BadRequestError } from '@shared/errors/BadRequestError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dataProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let car: Car;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(24, 'hours').toDate();

  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dataProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dataProvider,
      carsRepositoryInMemory
    );

    car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car Test',
      dailyRate: 100,
      licensePlate: 'test',
      fineAmount: 150,
      categoryId: '1234',
      brand: 'brand',
    });
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      userId: '12345',
      carId: car.id,
      expectedReturnDate: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
  });

  it('should not be able to create a new rental if there is another open to them same user', async () => {
    const car = await rentalsRepositoryInMemory.create({
      carId: '1421212',
      expectedReturnDate: dayAdd24Hours,
      userId: '12345',
    });

    const rental = {
      userId: '12345',
      carId: car.id,
      expectedReturnDate: dayAdd24Hours,
    };

    await expect(createRentalUseCase.execute(rental)).rejects.toEqual(
      new BadRequestError("There's rental in progress for user!")
    );
  });

  it('should not be able to create a new rental if there is another open to them same car', async () => {
    await createRentalUseCase.execute({
      userId: '123',
      carId: car.id,
      expectedReturnDate: dayAdd24Hours,
    });

    const sameCar = {
      userId: '321',
      carId: car.id,
      expectedReturnDate: dayAdd24Hours,
    };

    await expect(createRentalUseCase.execute(sameCar)).rejects.toEqual(
      new BadRequestError('Car is unavailable!')
    );
  });

  it('should not be able to create a new rental with a invalid date', async () => {
    const rental = {
      userId: '123',
      carId: '12121212',
      expectedReturnDate: dayjs().toDate(),
    };

    await expect(createRentalUseCase.execute(rental)).rejects.toEqual(
      new BadRequestError('Invalid return time!')
    );
  });
});
