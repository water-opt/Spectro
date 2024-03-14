const express = require('express');
const app = express();
const cors = require('cors');
//const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/db');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

//middleware
app.use(cors());
//app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.status(200).send('Hello from server!');
});


connectDB();


const port = process.env.PORT || 5000;

app.listen(port, ()  => console.log(`Listening on port ${port}`));