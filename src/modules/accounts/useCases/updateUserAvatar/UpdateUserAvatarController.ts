import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BadRequestError } from '@shared/errors/BadRequestError';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    if (!request.file) throw new BadRequestError('File not provided');

    const avatarUrl = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ userId: id, avatarUrl });

    return response.status(204).send();
  }
}
export { UpdateUserAvatarController };
