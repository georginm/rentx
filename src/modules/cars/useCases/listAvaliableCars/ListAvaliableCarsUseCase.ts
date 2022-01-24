import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  categoryId?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvaliableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ categoryId, brand, name }: IRequest): Promise<Car[]> {
    console.log({ categoryId, brand, name });
    const cars = await this.carsRepository.findAvaliable(
      brand,
      categoryId,
      name
    );

    // console.log(cars);
    return cars;
  }
}

export { ListAvaliableCarsUseCase };
