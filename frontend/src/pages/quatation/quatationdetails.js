import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function QuotationDetails() {
    const [showDiscounts, setShowDiscounts] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/quatation');
            if (response.data.success) {
                setShowDiscounts(response.data.data);
                console.log(response.data.data)
            }
        } catch (error) {
            alert('Error fetching data');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/quatation/delete_quotation/${id}`);
            if (response.data.success) {
                fetchData();
                alert('Quotation deleted successfully!');
            }
        } catch (error) {
            alert('Error deleting quotation');
        }
    };

    const handleDownloadReport = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Company Name', 'Company Email', 'Phone', 'Company Description', 'Furniture Types']],
            body: showDiscounts.map(item => [
                item.quotation_company_name,
                item.quotation_company_email,
                item.phone,
                item.company_description,
                item.furniture_types
            ])
        });
        doc.save('quotation_report.pdf');
    };

    const handleSearch = (e) => {
        setSearchKey(e.target.value);
        filterData(e.target.value);
    };

    const filterData = (searchKey) => {
        const filteredData = showDiscounts.filter((item) =>
            item.quotation_company_name.toLowerCase().includes(searchKey.toLowerCase())
        );
        setShowDiscounts(filteredData);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', width: '10%', marginLeft: '80%' }}>
                <Link to='/admin/AddSupplier' style={{ textDecoration: 'none' }}>
                    <button style={{ marginBottom: '10px', padding: '12px 24px', backgroundColor: '#21D192', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                        Add Supplier
                    </button>
                </Link>
                <Link to='/admin/supplierDetails' style={{ textDecoration: 'none' }}>
                    <button style={{ padding: '12px 24px', backgroundColor: '#21D192', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                        Manage Supplier
                    </button>
                </Link>
            </div>
            <div style={{ maxWidth: '1200px', margin: '0 auto', marginTop: '50px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '40px' }}>
                <div className='searchbtn' style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <input type="search" onChange={handleSearch} value={searchKey} placeholder='Search' className='in' style={{ width: '300px', height: '40px', marginRight: '10px', padding: '0 10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <button style={{ padding: '12px 24px', borderRadius: '5px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>Search</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#6dec93', color: '#fff' }}>
                            <th style={{ backgroundColor: '#999696', padding: '12px', textAlign: 'left', borderBottom: '1px solid #92d48d' }}>Company Image</th>
                            <th style={{ backgroundColor: '#999696', padding: '12px', textAlign: 'left', borderBottom: '1px solid #92d48d' }}>Company Name</th>
                            <th style={{ backgroundColor: '#999696', padding: '12px', textAlign: 'left', borderBottom: '1px solid #92d48d' }}>Company Email</th>
                            <th style={{ backgroundColor: '#999696', padding: '12px', textAlign: 'left', borderBottom: '1px solid #92d48d' }}>Phone</th>
                            <th style={{ backgroundColor: '#999696', padding: '12px', textAlign: 'left', borderBottom: '1px solid #92d48d' }}>Company Description</th>
                            <th style={{ backgroundColor: '#999696', padding: '12px', textAlign: 'left', borderBottom: '1px solid #92d48d' }}>Furniture Types</th>
                            <th style={{ backgroundColor: '#999696', padding: '12px', textAlign: 'left', borderBottom: '1px solid #92d48d' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showDiscounts.map((item) => (
                            <tr key={item._id}>
                                <td style={{ padding: '12px', borderBottom: '1px solid #92d48d' }}> 
                                    {item.furnitue_image.map(img => (
                                        <img style={{ height: '100px', margin: '10px 15px' }} src={"http://localhost:4000/" + img} alt="" />
                                    ))}
                                </td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #92d48d' }}>{item.quotation_company_name}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #92d48d' }}>{item.quotation_company_email}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #92d48d' }}>{item.phone}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #92d48d' }}>{item.company_description}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #92d48d' }}>{item.furniture_types}</td>
                                <td style={{ padding: '12px', borderBottom: '1px solid #92d48d' }}>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        style={{ padding: '8px 16px', borderRadius: '5px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button
                        onClick={handleDownloadReport}
                        style={{ padding: '12px 24px', backgroundColor: '#28a745', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                    >
                        Download Report
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuotationDetails;
