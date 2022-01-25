import { CarImages } from '../infra/typeorm/entities/CarImages';

interface ICarsImagesRepository {
  create(carId: string, imageName: string): Promise<CarImages>;
}

export { ICarsImagesRepository };
