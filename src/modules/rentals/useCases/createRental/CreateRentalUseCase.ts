import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDataProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private dateProvider: IDataProvider
  ) {}

  async execute({
    userId,
    carId,
    expectedReturnDate,
  }: IRequest): Promise<Rental> {
    const minimumReturnTime = 24;

    const rentalOpenToCar = await this.rentalsRepository.findOpenRentalByCar(
      carId
    );

    if (rentalOpenToCar) {
      throw new BadRequestError('Car is unavailable!');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      userId
    );

    if (rentalOpenToUser) {
      throw new BadRequestError("There's rental in progress for user!");
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expectedReturnDate
    );

    if (compare < minimumReturnTime) {
      throw new BadRequestError('Invalid return time!');
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
