import JwtService from '../utils/jwt';
import redisClient from '../utils/redis';
import sha256 from 'sha256'; 
import dbClient from '../utils/db'; 

class AuthController {
  static async login(req, res) {
    const header = req.header('Authorization');
    console.log('header:', header);
    if (!header) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const authData = header.split(' ')[1];
    if (!authData) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const userData = authData.split(':');
    if (userData.length !== 2) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const [identifier, password] = userData;
    const hashedPassword = sha256(password).toString();

    try {
      const users = await dbClient.db.collection('users');
      const user = await users.findOne({
        $or: [{ email: identifier }, { username: identifier }],
        password: hashedPassword
      });

      if (!user) {
        return res.status(401).send({ error: 'Invalid credentials' });
      }

      const privateKey = process.env.JWT_SECRET || 'pickafood';
      const token = JwtService.sign(
        { id: user._id, email: user.email, username: user.username },
        privateKey,
        { expiresIn: '24h' }
      );
      const key = `auth_${token}`;
      await redisClient.set(key, user._id.toString(), 3600 * 24);

      return res.status(200).send({ user: user.username, token });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

export default AuthController;