import { ICreateCarsDTO } from '@modules/dtos/ICreateCarDTO';

import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarsDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
  findAvaliable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]>;
}

export { ICarsRepository };
