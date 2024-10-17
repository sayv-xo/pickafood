import { sign, verify } from 'jsonwebtoken';

export default class JwtService {
  static sign(payload) {
    try {
      return sign(payload, process.env.JWT_SECRET);
    } catch (error) {
      console.error('Error signing the token:', error);
      throw new Error('Token signing failed');
    }
  }

  static verify(token) {
    try {
      return verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error('Error verifying the token:', error);
      throw new Error('Token verification failed');
    }
  }
}