const request = require('supertest');
const app = require('../server');

describe('Get All Product Details API', () => {
  it('should return all product details', async () => {
    // Send GET request to retrieve all product details
    const response = await request(app).get('/api/product');

    // Check response status code
    expect(response.status).toBe(200);

    // Check response body
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body.products)).toBe(true);

    

    const products = response.body.products;

    // Ensure each product has required properties
    products.forEach(product => {
      expect(product).toHaveProperty('productName');
      expect(product).toHaveProperty('productDesc');
      expect(product).toHaveProperty('productPrice');
      expect(product).toHaveProperty('productCategory');
      expect(product).toHaveProperty('productQty');
      
    });
  });
});
