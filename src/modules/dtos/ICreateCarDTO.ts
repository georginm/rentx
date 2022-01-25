import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

interface ICreateCarsDTO {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
  specifications?: Specification[];
  id?: string;
}

export { ICreateCarsDTO };
