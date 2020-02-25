import express from 'express';
import bodyParser from 'body-parser';
import { initRoutes } from './routes/index';

const app = express();
const PORT = 3000;

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
initRoutes(app);

app.listen(PORT, () =>
   console.log(`Hello world app listening on port ${PORT}!`)
);
