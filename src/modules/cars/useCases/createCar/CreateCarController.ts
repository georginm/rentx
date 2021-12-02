import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarUseCase } from './CreateCarUseCase';

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      fineAmount,
      description,
      dailyRate,
      categoryId,
      brand,
      licensePlate,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      name,
      fineAmount,
      description,
      dailyRate,
      categoryId,
      brand,
      licensePlate,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };
