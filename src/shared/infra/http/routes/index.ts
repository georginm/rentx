import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carsRoute } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { rentalRoutes } from './rental.routes';
import { specificationRoutes } from './specification.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationRoutes);
router.use('/users', usersRoutes);
router.use('/cars', carsRoute);
router.use('/rentals', rentalRoutes);
router.use('/password', passwordRoutes);
router.use(authenticateRoutes);

export { router };
