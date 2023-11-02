import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { SearchController } from '../controllers/SearchController';
import {container} from "tsyringe";

const router = Router();
const userController = container.resolve(UserController);
const searchController = container.resolve(SearchController);

// Define your routes
router.get('/users/:id', userController.getUser);
router.post('/users', userController.createUser);
router.post('/search', searchController.performSearch);

export default router;
