import { ICreateRentalDTO } from '@modules/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    carId,
    userId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      carId,
      userId,
      expectedReturnDate,
      startDate: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(carId: string): Promise<Rental | undefined> {
    return this.rentals.find(
      (rental) => rental.carId === carId && !rental.endDate
    );
  }

  async findOpenRentalByUser(userId: string): Promise<Rental | undefined> {
    return this.rentals.find(
      (rental) => rental.userId === userId && !rental.endDate
    );
  }

  async findById(id: string): Promise<Rental | undefined> {
    return this.rentals.find((rental) => rental.id === id);
  }

  async findByUser(userId: string): Promise<Rental[] | undefined> {
    return this.rentals.filter((rental) => rental.userId === userId);
  }
}

export { RentalsRepositoryInMemory };
