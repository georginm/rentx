import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, userId }: IRequest): Promise<Rental> {
    const minimumRent = 1;

    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new BadRequestError('Rental does not exists!');
    }

    if (rental.endDate) {
      throw new BadRequestError('This rental has already been closed!');
    }

    const car = await this.carsRepository.findById(rental.carId);

    if (!car) {
      throw new BadRequestError('Car does not exists!');
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.startDate, dateNow);

    if (daily <= 0) {
      daily = minimumRent;
    }

    const delay = this.dateProvider.compareInDays(
      rental.expectedReturnDate,
      dateNow
    );

    let total = 0;

    if (delay > 0) {
      const calculateFine = delay * car.fineAmount;

      total = calculateFine;
    }

    total += daily * car.dailyRate;

    rental.endDate = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);

    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
