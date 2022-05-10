import { Router } from 'express';
import multer from 'multer';

import upload from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { ProfileUserController } from '@modules/accounts/useCases/profileUserUseCase/ProfileUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(upload);

const createUserController = new CreateUserController();
const updateUserAvatarUserController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarUserController.handle
);

usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
