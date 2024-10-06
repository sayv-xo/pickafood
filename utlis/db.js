import 'dotenv/config';
import { MongoClient } from 'mongodb';

const port = process.env.DB_PORT || 27017;
const host = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_NAME || 'pickafood';

const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        this.db = client.db(dbName);
        this.menuCollection = this.db.collection('menus');
        this.userCollection = this.db.collection('users');
        this.orderCollection = this.db.collection('orders');
      } else {
        console.error(err);
        this.db = false;
      }
    });
  }

  isAlive() {
    return Boolean(this.db);
  }

  async nbMenu() {
    return this.menuCollection.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
