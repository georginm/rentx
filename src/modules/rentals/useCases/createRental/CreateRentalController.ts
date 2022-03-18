import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalUseCase } from './CreateRentalUseCase';

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { expectedReturnDate, carId } = request.body;
    const { id } = request.user;

    console.log(request.body);

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      expectedReturnDate,
      carId,
      userId: id,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
