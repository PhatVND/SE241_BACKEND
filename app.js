const express = require('express');
const moongoose = require('mongoose');
const route = require('./routes/index.js');
const { logger } = require('./middlerware/logEvents');
const errorHandler = require('./middlerware/errorHandler');
const cookieParser = require('cookie-parser');
const multer = require("multer");
const cors = require('cors');

// Load biến môi trường
require('dotenv').config({ path: './.env' });
const path = require('path');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8080;

// Kết nối views 
app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
// Kết nối CSDL
const database_link = process.env.MONGODB_LINK;
console.log(database_link);

// Midleware
app.use(logger);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view cache', false);


moongoose
    .connect(database_link)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err));

route(app);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// app.get('/user/info', (req, res) => {
//   res.render('user/user_info');
// });