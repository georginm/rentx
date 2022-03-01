import { BadRequestError } from '@shared/errors/BadRequestError';

import { Rental } from '../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../repositories/IRentalsRepository';

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    userId,
    carId,
    expectedReturnDate,
  }: IRequest): Promise<Rental> {
    const rentalOpenToCar = await this.rentalsRepository.findOpenRentalByCar(
      carId
    );

    if (rentalOpenToCar) {
      throw new BadRequestError('Car is unavaliable!');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      userId
    );

    if (rentalOpenToUser) {
      throw new BadRequestError("There's rental in progress for user!");
    }

    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
