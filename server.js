import 'dotenv/config';
import router from './routes/index';

const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'pickafood API',
    version: '1.0.0',
    description:
        'This is a food ordering REST API application made with Express. ',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Saviour',
      url: 'https://github.com/sayv-xo',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);


const port = process.env.API_PORT || 3000;
const app = express();

app.use(express.json());
app.use('/', router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;
