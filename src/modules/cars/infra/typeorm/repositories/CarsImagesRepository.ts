import { getRepository, Repository } from 'typeorm';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';

import { CarImages } from '../entities/CarImages';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImages>;

  constructor() {
    this.repository = getRepository(CarImages);
  }

  async create(carId: string, imageName: string): Promise<CarImages> {
    const carImage = this.repository.create({ carId, imageName });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };
