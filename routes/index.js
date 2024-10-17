import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import MenuController from '../controllers/MenusController';

const router = Router();

router.get('/status', AppController.getStatus);

router.post('/register', UsersController.postNew);

router.get('/login', AuthController.login);
router.get('/logout', AuthController.getDisconnect); 

router.post('/menus', MenuController.createMenu);

module.exports = router;
