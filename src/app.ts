import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { routes } from './routes/index';
import { db } from './db/models';
import { swaggerInit } from './swagger';

const app = express();
const PORT = 3000;

swaggerInit(app);

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

routes.init(app);
db.init();

app.listen(PORT, () =>
   console.log(`Hello world app listening on port ${PORT}!`)
);
