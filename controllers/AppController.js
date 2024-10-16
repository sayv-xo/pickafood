import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController{
  static getStatus(req, res) {
    const dbStatus = dbClient.isAlive();
    const redisStatus = redisClient.isAlive();

    if (dbStatus && redisStatus) {
      return res.status(200).send({  appStatus: 'live', redis: redisStatus, db: dbStatus });
    }
    return res.status(503).send({ error: 'Service temporarily Unavailable' });
  }
}

export default AppController;