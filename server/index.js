const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const route = require('./photos.route');
const cors = require('cors');

app.use(
  cors({
    origin: 'http://127.0.0.1:5173',
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  })
);

app.use(express.json());
app.use(route);

app.listen(3000);
