import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listByUserUseCase = container.resolve(ListRentalsByUserUseCase);

    const rentals = await listByUserUseCase.execute(id);

    return response.status(200).json(rentals);
  }
}

export { ListRentalsByUserController };
