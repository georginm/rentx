import { CarsRepositoryInMemory } from '@modules/cars/infra/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should be able to list all Available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description Car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand Car',
      categoryId: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car2',
      description: 'Description Car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand Car2',
      categoryId: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Brand Car2',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car3',
      description: 'Description Car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand Car2',
      categoryId: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: 'Name Car3' });

    expect(cars).toEqual([car]);
  });

  it('should be able to list cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car3',
      description: 'Description Car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand Car2',
      categoryId: 'category123',
    });

    const cars = await listAvailableCarsUseCase.execute({
      categoryId: 'category123',
    });

    expect(cars).toEqual([car]);
  });
});
