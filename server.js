import 'dotenv/config';
import router from './routes/index';

const express = require('express');

const port = process.env.API_PORT || 3000;
const app = express();

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
console.log(`App listening on port ${port}`);
});

export default app;
