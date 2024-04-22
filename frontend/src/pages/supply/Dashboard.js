import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SupplierReport() {
  const [countlist, setCountlist] = useState([]);
  const [customerlist, setCustomerlist] = useState([]);

  // Read supplier data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/supplier/count");
      const { count } = response.data;
      setCountlist(count);
      setCustomerlist(response.data.data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Total Supplier Report</h3>
      {countlist !== null ? (
        <p style={{ marginBottom: '10px' }}>Total List of Suppliers: {countlist}</p>
      ) : (
        <p>Loading...</p>
      )}

      <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Summary Of Supplier Details:</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#58d256', border: '1px solid #cbc7c7', padding: '8px', textAlign: 'left' }}>Supplier Name</th>
            <th style={{ backgroundColor: '#58d256', border: '1px solid #cbc7c7', padding: '8px', textAlign: 'left' }}>Company Name</th>
            <th style={{ backgroundColor: '#58d256', border: '1px solid #cbc7c7', padding: '8px', textAlign: 'left' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {customerlist.map((supplier) => (
            <tr key={supplier._id} style={{ border: '1px solid #cbc7c7' }}>
              <td style={{ padding: '8px', textAlign: 'left' }}>{supplier.supplier_name}</td>
              <td style={{ padding: '8px', textAlign: 'left' }}>{supplier.company_name}</td>
              <td style={{ padding: '8px', textAlign: 'left' }}>{supplier.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupplierReport;
