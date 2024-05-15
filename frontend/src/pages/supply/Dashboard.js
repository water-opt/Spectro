import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SupplierReport() {
  const [countlist, setCountlist] = useState(null);
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
    <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '800px', margin: '0 auto' }}>
      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Total Supplier Report</h3>
        <p>Total List of Suppliers: {countlist !== null ? countlist : "Loading..."}</p>
      </div>

      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Summary Of Supplier Details:</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: '600px' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Supplier ID</th>
                <th style={tableHeaderStyle}>Company Name</th>
                <th style={tableHeaderStyle}>Email</th>
              </tr>
            </thead>
            <tbody>
              {customerlist.map((supplier) => (
                <tr key={supplier._id}>
                  <td style={tableCellStyle}>{supplier.supplier_name}</td>
                  <td style={tableCellStyle}>{supplier.company_name}</td>
                  <td style={tableCellStyle}>{supplier.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const tableHeaderStyle = {
  backgroundColor: '#58d256',
  border: '1px solid #cbc7c7',
  padding: '8px',
  textAlign: 'left',
  color: '#fff'
};

const tableCellStyle = {
  padding: '8px',
  textAlign: 'left',
  border: '1px solid #cbc7c7'
};

export default SupplierReport;
