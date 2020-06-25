const courses =  require('./routes/courses')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const db = 'mongodb://localhost/coursesDB';
mongoose.connect(db);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api/courses', courses);
app.listen(port, () => console.log(`listening at http://localhost:${port}`));