import { getRepository, IsNull, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(carId: string): Promise<Rental | undefined> {
    const openByCar = await this.repository.findOne({
      where: {
        carId,
        endDate: IsNull(),
      },
    });

    return openByCar;
  }

  async findOpenRentalByUser(userId: string): Promise<Rental | undefined> {
    const openByUser = await this.repository.findOne({
      where: {
        userId,
        endDate: IsNull(),
      },
    });

    return openByUser;
  }

  async create({
    carId,
    expectedReturnDate,
    userId,
    id,
    endDate,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      carId,
      expectedReturnDate,
      userId,
      id,
      endDate,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  async findByUser(userId: string): Promise<Rental[] | undefined> {
    const rentals = await this.repository.find({
      where: { userId },
      relations: ['car'],
    });

    return rentals;
  }
}

export { RentalsRepository };
