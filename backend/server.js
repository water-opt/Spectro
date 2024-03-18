const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/db');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const filterRoutes = require('./routes/filter');
const userRoutes = require('./routes/user.route');
const orderRoutes = require('./routes/order.route');
const cartRoutes = require('./routes/cart.route');
const riderRoutes = require('./routes/rider.route');
const deliveryVehicleRoutes = require('./routes/vehicle.route');

/* Configure environment variables */
require('dotenv').config();
const port = process.env.PORT || 5000;
const uri = process.env.URI;

/* Create express application instance */
const app = express();

/* Configure middleware */
app.use(cors());
app.use(session({
    secret: "qwrewadsc2wjdnaskf9ajsn1",
    resave: false,
    saveUninitialized: true
}));
app.use(express.json());
app.use(cookieParser());

/* Configure routes */
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/filter', filterRoutes);
app.get('/', (req, res) => {
    res.status(200).send('Hello from server!');
});

/* Initialize database connection */
connectDB();

/* Start server */
app.listen(port, ()  => console.log(`Listening on port ${port}`));