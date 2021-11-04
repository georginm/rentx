import { Specification } from '../entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ description, name }: ICreateSpecificationDTO): void;
  findByName(name: string): Specification | undefined;
}

export { ICreateSpecificationDTO, ISpecificationRepository };
