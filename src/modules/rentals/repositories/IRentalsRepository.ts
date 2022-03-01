import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  findOpenRentalByCar(carId: string): Promise<Rental | undefined>;
  findOpenRentalByUser(userId: string): Promise<Rental | undefined>;
}

export { IRentalsRepository };
