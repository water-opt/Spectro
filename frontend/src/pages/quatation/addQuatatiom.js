import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const QuotationForm = () => {
  const [formData, setFormData] = useState({
    quotation_company_name: '',
    quotation_company_email: '',
    phone: '',
    company_description: '',
    furniture_types: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [furnitureImage, setFurnitureImage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = new FormData();
      data.append('quotation_company_name', formData.quotation_company_name);
      data.append('quotation_company_email', formData.quotation_company_email);
      data.append('phone', formData.phone);
      data.append('company_description', formData.company_description);
      data.append('furniture_types', formData.furniture_types);
      for (let i = 0; i < furnitureImage.length; i++) {
        data.append('furniture_image', furnitureImage[i]);
      }

      const response = await axios.post('http://localhost:4000/api/quatation/create_quotation', data);

      setFormData({
        quotation_company_name: '',
        quotation_company_email: '',
        phone: '',
        company_description: '',
        furniture_types: ''
      });
      setFurnitureImage('');

      Swal.fire({
        icon: 'success',
        title: 'Quotation Added Successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error:', error.response.data);

      Swal.fire({
        icon: 'error',
        title: 'Error Occurred',
        text: 'Failed to add quotation. Please try again.',
        confirmButtonText: 'Ok'
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.quotation_company_name) {
      errors.quotation_company_name = 'Company Name is required';
    }
    if (!formData.quotation_company_email) {
      errors.quotation_company_email = 'Company Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.quotation_company_email)) {
      errors.quotation_company_email = 'Invalid email format';
    }
    if (!formData.phone) {
      errors.phone = 'Phone is required';
    }
    if (!formData.company_description) {
      errors.company_description = 'Company Description is required';
    }
    if (!formData.furniture_types) {
      errors.furniture_types = 'Furniture Types is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", marginTop: "50px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>Add Quotation</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginBottom: '8px', fontWeight: 'bold' }}>Company Name:</label>
          <input
            type="text"
            name="quotation_company_name"
            value={formData.quotation_company_name}
            onChange={handleChange}
            required
          />
          {formErrors.quotation_company_name && <span style={{ color: 'red', fontSize: '14px' }}>{formErrors.quotation_company_name}</span>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginBottom: '8px', fontWeight: 'bold' }}>Company Email:</label>
          <input
            type="email"
            name="quotation_company_email"
            value={formData.quotation_company_email}
            onChange={handleChange}
            required
          />
          {formErrors.quotation_company_email && <span style={{ color: 'red', fontSize: '14px' }}>{formErrors.quotation_company_email}</span>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginBottom: '8px', fontWeight: 'bold' }}>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {formErrors.phone && <span style={{ color: 'red', fontSize: '14px' }}>{formErrors.phone}</span>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginBottom: '8px', fontWeight: 'bold' }}>Company Description:</label>
          <textarea
            name="company_description"
            value={formData.company_description}
            onChange={handleChange}
            required
          />
          {formErrors.company_description && <span style={{ color: 'red', fontSize: '14px' }}>{formErrors.company_description}</span>}
        </div>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <div style={{ flex: '1', marginRight: '10px' }}>
            <label style={{ marginBottom: '8px', fontWeight: 'bold' }}>Furniture Types:</label>
            <select
              name="furniture_types"
              value={formData.furniture_types}
              onChange={handleChange}
              style={{ width: '100%', height: '40px', borderRadius: '4px', border: '1px solid #ccc' }}
              required
            >
              <option value="">Select Furniture Type</option>
              <option value="Dinning Chairs">Dinning Chairs</option>
              <option value="Beds">Beds</option>
              <option value="Mirrors">Mirrors</option>
              {/* Add more options as needed */}
            </select>
            {formErrors.furniture_types && <span style={{ color: 'red', fontSize: '14px' }}>{formErrors.furniture_types}</span>}
          </div>
          <div style={{ flex: '1' }}>
            <label style={{ marginBottom: '8px', fontWeight: 'bold' }}>Image:</label>
            <input
              type="file"
              name="furniture_image"
              onChange={(e) => setFurnitureImage(e.target.files)}
              required
              multiple
            />
            {formErrors.furniture_types && <span style={{ color: 'red', fontSize: '14px' }}>{formErrors.furniture_types}</span>}
          </div>
        </div>
        <button type="submit" style={{ width: '100%', height: '40px', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
};

export default QuotationForm;
