import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { BadRequestError } from '@shared/errors/BadRequestError';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImageConstroller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    if (!images) throw new BadRequestError('Erro ao processar imagens!');

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const imagesName = images.map((file) => file.filename);

    await uploadCarImagesUseCase.execute({ carId: id, imagesName });

    return response.status(201).send();
  }
}

export { UploadCarImageConstroller };
