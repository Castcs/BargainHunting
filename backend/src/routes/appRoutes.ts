import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { SearchController } from '../controllers/SearchController';

const router = Router();
const userController = new UserController();
const searchController = new SearchController();

// Define your routes
router.get('/findUser/:username', userController.getUserByUsername);
router.post('/register', userController.createUser);
router.post('/search', searchController.performSearch);
router.post('/login', userController.login);
router.get('/history', searchController.getSearchResultsByUserID);
router.post('/saveSearch', searchController.saveResult)


export default router;
