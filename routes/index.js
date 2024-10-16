import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const router = Router();

router.get('/status', AppController.getStatus);

router.post('/register', UsersController.postNew);

module.exports = router;