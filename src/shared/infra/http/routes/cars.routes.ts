import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

const carsRoute = Router();

const createCarController = new CreateCarController();

carsRoute.post('/', createCarController.handle);

export { carsRoute };
