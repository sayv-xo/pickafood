import sha256 from 'sha256';
import dbClient from '../utils/db';

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

    const newUser = await dbClient.usersCollection.insertOne({ username, email, password: sha256(password) });
    return res.status(201).send({ message: `User ${username} created successfully.` });
  }
}







export default UsersController;