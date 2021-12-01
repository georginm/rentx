import { Specification } from '@modules/cars/infra/entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ description, name }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification | undefined>;
}

export { ICreateSpecificationDTO, ISpecificationsRepository };
