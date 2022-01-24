import { CarsRepositoryInMemory } from '@modules/cars/infra/in-memory/CarsRepositoryInMemory';

import { ListAvaliableCarsUseCase } from './ListAvaliableCarsUseCase';

let listAvaliableCarsUseCase: ListAvaliableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvaliableCarsUseCase = new ListAvaliableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should be able to list all avaliable cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description Car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand Car',
      categoryId: 'category',
    });

    const cars = await listAvaliableCarsUseCase.execute({});

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

    const cars = await listAvaliableCarsUseCase.execute({
      brand: 'Brand Car2',
    });

    console.log(cars);

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

    const cars = await listAvaliableCarsUseCase.execute({ name: 'Name Car3' });

    console.log(cars);

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

    const cars = await listAvaliableCarsUseCase.execute({
      categoryId: 'category123',
    });

    console.log(cars);

    expect(cars).toEqual([car]);
  });
});
