import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index.js';

const app = express();
const PORT = 3000;

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(PORT, 
   () => console.log(`Hello world app listening on port ${PORT}!`))