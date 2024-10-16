import dbClient from '../utils/db';

class MenuController {
  static async createMenu(req, res) {
    const { name, price, category } = req.body;
    if (!name) return res.status(400).send({ error: 'Name is required' });
    if (!price) return res.status(400).send({ error: 'Price is required' });
    if (!category) return res.status(400).send({ error: 'Category is required' });


    try {
      const menu = await dbClient.menuCollection.insertOne({ name, price, category });
      return res.status(201).send(`Menu item "${name}" has been created`);
    } catch (error) {
      console.error('Error during createMenu:', error);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }

  static async getMenus(req, res) {
    try {
      const menus = await dbClient.menuCollection.find({}, { projection: { _id: 0, name: 1, price: 1, category: 1 } }).toArray();
      return res.status(200).send(menus);
    } catch (error) {
      console.error('Error during getMenus:', error);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

export default MenuController;