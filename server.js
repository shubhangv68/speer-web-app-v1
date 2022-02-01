const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
app.use(express.static(path.resolve(__dirname, "./client/build")));
// connect to db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,

        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB CONNECTION ERROR: ', err));

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category');
const advisorRoutes = require('./routes/advisor');
// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(cors()); // allows all origins
if ((process.env.NODE_ENV = 'development')) {
    app.use(cors({ origin: `http://localhost:3000` }));
}

// middleware
app.use('/api', authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',advisorRoutes);



app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build/index.html"));
  });
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});

