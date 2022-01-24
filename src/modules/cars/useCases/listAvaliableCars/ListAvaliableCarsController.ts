import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvaliableCarsUseCase } from './ListAvaliableCarsUseCase';

class ListAvaliableCarsController {
  async handle(request: Request, response: Response) {
    const { brand, name, categoryId } = request.query;

    const listAvaliableCarsUseCase = container.resolve(
      ListAvaliableCarsUseCase
    );

    const cars = await listAvaliableCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      categoryId: categoryId as string,
    });

    return response.json(cars);
  }
}

export { ListAvaliableCarsController };
