import dbClient from '../utils/db';
import JwtService from '../utils/jwt';
import redisClient from '../utils/redis';
import { ObjectId } from 'mongodb';
import 'dotenv/config';

class OrderController {
  static async createOrder(req, res) {
    const token = req.header('X-Token');
    if (!token) return res.status(401).send({ error: 'Unauthorized' });

    const privateKey = process.env.JWT_SECRET || 'pickafood';

    try {
      const decoded = JwtService.verify(token, privateKey);
      const key = `auth_${token}`;
      const userId = await redisClient.get(key);
        
      if (!userId) {
        return res.sendStatus(401);
      }

      const { items } = req.body;
      const itemDetails = await Promise.all(items.map(async (item) => {
        const menuItem = await dbClient.menuCollection.findOne({ name: item.name });
        if (!menuItem) {
          throw new Error(`Menu item not found: ${item.name}`);
        }
        return {
          _id: menuItem._id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: item.quantity
        };
      }));
      const totalPrice = itemDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
      const idObject = new ObjectId(userId);
      
      const order = {
        userId: idObject,
        items: itemDetails,
        totalPrice,
        date: new Date()
      };
          
      const result = await dbClient.ordersCollection.insertOne(order);
      const orderSummary = {
        _id: result.insertedId,
        totalPrice: order.totalPrice,
        date: order.date,
        itemCount: itemDetails.reduce((sum, item) => sum + item.quantity, 0),
        items: itemDetails.map(item => ({
          name: item.name,
          quantity: item.quantity
        }))
      };

      await dbClient.usersCollection.updateOne(
        { _id: idObject },
        { $push: { orders: orderSummary } }
      );
      res.status(201).json({ message: 'Order created', orderId: result.insertedId, order });
    } catch (error) { 
      res.status(500).json({ message: 'Error creating order', error: error.message });
    }


  }

  static async getOrders(req, res) {

  }
}

export default OrderController;