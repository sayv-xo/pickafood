import sha256 from 'sha256';
import dbClient from '../utils/db';
import 'dotenv/config';
import JwtService from '../utils/jwt';
import redisClient from '../utils/redis';
import { ObjectId } from 'mongodb';

class UsersController {
  // creates a new user
  static async postNew(req, res) {
    const { username, email, password } = req.body;
    if (!email) {
      return res.status(400).send({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).send({ error: 'Missing password' });
    }
    if (!username) {
      return res.status(400).send({ error: 'Missing username' });
    }

    const usernameExists = await dbClient.usersCollection.findOne({ username });
    if (usernameExists) {
      return res.status(400).send({ error: 'Username already exist' });
    }

    const emailExists = await dbClient.usersCollection.findOne({ email });
    if (emailExists) {
      return res.status(400).send({ error: 'Email already exist' });
    }

    const userId = new ObjectId();

    const newUser = {
      _id: userId,
      username,
      email,
      orders: [],
      password: sha256(password),
    };
    await dbClient.usersCollection.insertOne(newUser);
    return res.status(201).send({ message: `User ${username} with id ${userId} created successfully.` });
  }

  static async getMe(req, res) {
    const token = req.header('X-Token');

    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const privateKey = process.env.JWT_SECRET || 'pickafood';

    try {
      const decoded = JwtService.verify(token, privateKey);
      const key = `auth_${token}`;
      const userId = await redisClient.get(key);

      if (!userId) {
        return res.sendStatus(401);
      }
      
      const users = dbClient.usersCollection;
      const idObject = new ObjectId(userId);
      const user = await users.findOne({ _id: idObject });
      return res.status(200).send({ username: user.username, email: user.email, orders: user.orders });

    } catch (err) {
      return res.status(401).send({ error: ' Unauthorized' });
    }
  }
}

export default UsersController;