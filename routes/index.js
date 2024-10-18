import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import MenuController from '../controllers/MenusController';
import OrderController from '../controllers/OrderController';


const router = Router();

/**
 * @swagger
 * /status:
 *  get: 
 *   description: Returns the API status
 */
router.get('/status', AppController.getStatus);

router.post('/register', UsersController.postNew);
router.get('/me', UsersController.getMe);

router.get('/login', AuthController.login);
router.get('/logout', AuthController.getDisconnect); 

router.post('/menus', MenuController.createMenu);
router.get('/menus', MenuController.getMenus);


router.post('/orders', OrderController.createOrder);
router.get('/orders', OrderController.getOrders);


module.exports = router;
