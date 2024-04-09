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
const orderRiderRoutes = require('./routes/orderRider.route')

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
app.get('/', (req, res) => {
    res.status(200).send('Hello from server!');
});
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/filter', filterRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/deliveryvehicles', deliveryVehicleRoutes);
app.use('/api/riders', riderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order/rider', orderRiderRoutes);


/* Initialize database connection */
connectDB();

/* Start server */
if (process.env.NODE_ENV !== 'test') { // This is used for jest tests. During testing, when you feed your app to supertest, it will run your app on port 0 since it's not already running on a port.  Port 0 is how you tell Unix machines to choose the first randomly available port that you find. Now, each test suite is running on a randomly available port, there is no longer a risk of port collisions which means we've solved the EADDRINUSE - port already in use error and we can continue running tests in parallel. See: https://stackoverflow.com/a/63293781
    app.listen(port, ()  => console.log(`Listening on port ${port}`));
}

module.exports = app;
