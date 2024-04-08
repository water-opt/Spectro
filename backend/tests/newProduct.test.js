const request = require('supertest');
const app = require('../server');
// const connectDB = require('../database/db'); // Import connectDB function

// beforeAll(async () => {
//     await connectDB(); // Wait for the database connection to be established
// });

describe('Product API', () => {
    it('should add a new product', async () => {
        const newProduct = {
            productName: 'L Grand Sofa',
            productDesc: 'Description of the test product',
            productPrice: 135000,
            productCategory: '66065a7875a03675d1c9f683',
            productQty: 10,
            file: "a.jpg"
        };

        // Make POST request to add a new product
        const response = await request(app)
            .post('/api/product')
            .send(newProduct); // Send product data as request body

        // Expect status code 200 for successful product creation
        expect(response.status).toBe(200);

        // Check if response body contains the success message and a product object
        expect(response.body.successMessage).toBeTruthy();
        expect(response.body.product).toBeTruthy();
    });
});
