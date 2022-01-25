import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  carId: string;
  specificationsId: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ carId, specificationsId }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(carId);

    if (!carExists) {
      throw new BadRequestError('Car does not exists!');
    }

    const specifications = await this.specificationsRepository.findByIds(
      specificationsId
    );

    if (specifications) carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}

export { CreateCarSpecificationUseCase };
