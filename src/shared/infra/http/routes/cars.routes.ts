import { Router } from 'express';
import multer from 'multer';

import upload from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvaliableCarsController } from '@modules/cars/useCases/listAvaliableCars/ListAvaliableCarsController';
import { UploadCarImageConstroller } from '@modules/cars/useCases/uploadImage/UploadCarImagesController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoute = Router();

const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvaliableCarsController();
const createCarsSpecificationController =
  new CreateCarSpecificationController();

const uploadCarImagesController = new UploadCarImageConstroller();

const uploadCarImage = multer(upload('./tmp/cars'));

carsRoute.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoute.get('/avaliable', listAvaliableCarsController.handle);

carsRoute.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarsSpecificationController.handle
);

carsRoute.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImage.array('images'),
  uploadCarImagesController.handle
);

export { carsRoute };
