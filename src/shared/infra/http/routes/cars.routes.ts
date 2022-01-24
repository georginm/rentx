import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvaliableCarsController } from '@modules/cars/useCases/listAvaliableCars/ListAvaliableCarsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoute = Router();

const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvaliableCarsController();

carsRoute.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoute.get('/avaliable', listAvaliableCarsController.handle);

export { carsRoute };
