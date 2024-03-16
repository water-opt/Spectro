const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/db');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const filterRoutes = require('./routes/filter');
require('dotenv').config();

const port = process.env.PORT || 5000;
const uri = process.env.URI

const app = express()
//middleware
app.use(cors());
//app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/filter', filterRoutes);


app.get('/', (req, res) => {
    res.status(200).send('Hello from server!');
});


connectDB();

app.listen(port, ()  => console.log(`Listening on port ${port}`));