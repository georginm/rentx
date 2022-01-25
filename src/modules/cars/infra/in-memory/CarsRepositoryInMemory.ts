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
    id,
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
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.licensePlate === licensePlate);
  }

  async findAvaliable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.avaliable === true ||
        (brand && car.brand === brand) ||
        (categoryId && car.categoryId === categoryId) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });
    return cars;
  }

  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.id === id);
  }
}

export { CarsRepositoryInMemory };
