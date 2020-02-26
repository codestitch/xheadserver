import * as express from 'express';
import * as bodyParser from 'body-parser';

import { routes } from './routes/index';
import { db } from './db/models';

const app = express();
const PORT = 3000;

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));

routes.init(app);
db.init();

app.listen(PORT, () =>
   console.log(`Hello world app listening on port ${PORT}!`)
);
