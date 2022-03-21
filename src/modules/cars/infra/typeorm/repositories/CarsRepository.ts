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
    specifications,
    id,
  }: ICreateCarsDTO): Promise<Car> {
    try {
      const car = this.repository.create({
        name,
        fineAmount,
        description,
        dailyRate,
        categoryId,
        brand,
        licensePlate,
        specifications,
        id,
      });

      await this.repository.save(car);
      return car;
    } catch (error) {
      throw new BadRequestError(`${error}`);
    }
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ licensePlate });

    return car;
  }

  async findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('c.name = :name', { name });
    }

    if (categoryId) {
      carsQuery.andWhere('c.category_id = :categoryId', { categoryId });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne(id);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where({ id })
      .execute();
  }
}

export { CarsRepository };
