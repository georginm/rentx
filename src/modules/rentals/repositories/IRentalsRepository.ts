import { ICreateRentalDTO } from '@modules/dtos/ICreateRentalDTO';

import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  findOpenRentalByCar(carId: string): Promise<Rental | undefined>;
  findOpenRentalByUser(userId: string): Promise<Rental | undefined>;
  create(data: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
