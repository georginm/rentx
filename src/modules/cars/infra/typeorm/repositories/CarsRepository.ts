import { getRepository, Repository } from 'typeorm';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICreateCarsDTO } from '@modules/dtos/ICreateCarDTO';
import { BadRequestError } from '@shared/errors/BadRequestError';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    fineAmount,
    description,
    dailyRate,
    categoryId,
    brand,
    licensePlate,
  }: ICreateCarsDTO): Promise<Car> {
    const carAlreadyExists = await this.findByLicensePlate(licensePlate);

    if (carAlreadyExists) throw new BadRequestError('Car already exists');

    try {
      const car = this.repository.create({
        name,
        fineAmount,
        description,
        dailyRate,
        categoryId,
        brand,
        licensePlate,
      });

      await this.repository.save(car);
      return car;
    } catch (error) {
      throw new BadRequestError('Erro');
    }
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ licensePlate });

    return car;
  }
}

export { CarsRepository };