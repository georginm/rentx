import { CarsRepositoryInMemory } from '@modules/cars/infra/in-memory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/cars/infra/in-memory/SpecificationRepositoryInMemory';
import { BadRequestError } from '@shared/errors/BadRequestError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should not be able to add a new specification to a non-existing car', async () => {
    expect(async () => {
      const carId = '123456';
      const specificationsId = ['123456'];

      await createCarSpecificationUseCase.execute({ carId, specificationsId });
    }).rejects.toBeInstanceOf(BadRequestError);
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description Car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand Car',
      categoryId: 'category',
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: 'test',
      name: 'test',
    });

    const carId = car.id;
    const specificationsId = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      carId,
      specificationsId,
    });

    expect.any(specificationsCars).toHaveProperty('specifications');
    expect.any(specificationsCars.specifications.length).toBe(1);
  });
});
