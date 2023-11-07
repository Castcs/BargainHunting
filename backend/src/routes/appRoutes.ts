import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { SearchController } from '../controllers/SearchController';
import {container} from "tsyringe";

const router = Router();
const userController = container.resolve(UserController);
const searchController = container.resolve(SearchController);

// Define your routes
router.get('/findUser/:username', userController.getUserByUsername);
router.post('/register', userController.createUser);
router.post('/search', searchController.performSearch);
router.post('/login', userController.login);
router.post('/logout', userController.logout)
router.post('/getHistory', searchController.getSearchResultsByUserID);


export default router;
