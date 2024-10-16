import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'pickafood';
const DB_URL = `mongodb://${DB_HOST}:${DB_PORT}`;

class DBCLient {
  constructor() {
    this.client = new MongoClient(DB_URL, { useUnifiedTopology: true });
    this.clientIsConnected = false;
    
    this.client.connect()
      .then(() => {
        this.clientIsConnected = true;
      })
      .catch(() => {
        this.clientIsConnected = false;
      });
    this.db = this.client.db(DB_NAME);
    this.usersCollection = this.db.collection('users');
    this.menuCollection = this.db.collection('menu');
    this.ordersCollection - this.db.collection('orders');
  }

  isAlive() {
    return this.clientIsConnected;
  }

  async nbUsers() {
    return this.usersCollection.countDocuments();
  }
}

const dbClient = new DBCLient();
export default dbClient;
