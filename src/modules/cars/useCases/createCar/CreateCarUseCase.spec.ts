import { CarsRepositoryInMemory } from '@modules/cars/infra/in-memory/CarsRepositoryInMemory';
import { BadRequestError } from '@shared/errors/BadRequestError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand Car',
      categoryId: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', async () => {
    const car1 = {
      name: 'Car 1',
      description: 'Description Car1',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand Car',
      categoryId: 'category',
    };

    await createCarUseCase.execute(car1);

    const car2 = {
      name: 'Car 2',
      description: 'Description Car2',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand Car2',
      categoryId: 'category',
    };

    await expect(createCarUseCase.execute(car2)).rejects.toEqual(
      new BadRequestError('Car already exists')
    );
  });

  it('should be able to create a car with Available true by default', async () => {
    expect(async () => {
      const car = await createCarUseCase.execute({
        name: 'Car 2',
        description: 'Description Car2',
        dailyRate: 100,
        licensePlate: 'ABCD-1234',
        fineAmount: 60,
        brand: 'Brand Car',
        categoryId: 'category',
      });

      expect(car).toBe(true);
    });
  });
});
