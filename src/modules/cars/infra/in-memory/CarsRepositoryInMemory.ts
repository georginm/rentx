import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICreateCarsDTO } from '@modules/dtos/ICreateCarDTO';

import { ICarsRepository } from '../../repositories/ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    categoryId,
    dailyRate,
    description,
    name,
    fineAmount,
    licensePlate,
  }: ICreateCarsDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      categoryId,
      dailyRate,
      description,
      name,
      fineAmount,
      licensePlate,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.licensePlate === licensePlate);
  }
}

export { CarsRepositoryInMemory };
