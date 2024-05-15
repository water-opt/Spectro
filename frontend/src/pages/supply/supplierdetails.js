import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Swal from 'sweetalert2';

function SupplierDetails() {
    const componentPDF = useRef();
    const [showdiscounts, setshowdiscounts] = useState([]);
    const [searchkey, setsearchkey] = useState('');

    // Read data
    const getfetchdata = async () => {
        try {
            const data = await axios.get("http://localhost:4000/api/supplier/");
            if (data.data.success) {
                setshowdiscounts(data.data.data);
            }
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

    // Delete data
    const handledelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
            
            if (result.isConfirmed) {
                const data = await axios.delete(`http://localhost:4000/api/supplier/delete/${id}`);
                if (data.data.success) {
                    getfetchdata();
                    console.log(data.data.message);
                    Swal.fire(
                        'Deleted!',
                        'Order item has been deleted.',
                        'success'
                    );
                }
            }
        } catch (err) {
            console.error(err);
            Swal.fire(
                'Error!',
                'Failed to delete order item.',
                'error'
            );
        }
    };

    // Generate PDF
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Show Services",
        onAfterPrint: () => Swal.fire(
            'Success!',
            'Data saved in PDF',
            'success'
        )
    });

    // Search data
    const handlesearch = (e) => {
        setsearchkey(e.target.value);
        filterdata(e.target.value);
    };

    const filterdata = (searchKey) => {
        const filteredData = showdiscounts.filter((customer) =>
            customer.supplier_name.toLowerCase().includes(searchKey.toLowerCase())
        );
        setshowdiscounts(filteredData);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', width: '10%', marginLeft: '80%' }}>
                <Link to='/admin/totalSupplierReport' style={{ textDecoration: 'none' }}>
                    <button style={{ padding: '12px 24px', backgroundColor: '#21D192', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                        Reports
                    </button>
                </Link>
            </div>

            <div className="showorders" style={{ maxWidth: "1200px", margin: "0 auto", marginTop: "50px", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginBottom: "40px" }}>
                <div className='searchbtn' style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <input type="search" onChange={handlesearch} value={searchkey} placeholder='Search' className='in' style={{ width: '300px', height: '40px', marginRight: '10px', padding: '0 10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <button id='search-btn' onClick={handlesearch} style={{ padding: '12px 24px', borderRadius: '5px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>Search</button>
                </div>
                <div ref={componentPDF}>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr className="headrow" style={{ backgroundColor: '#6dec93', color: '#fff' }}>
                                <th  style={{ backgroundColor: '#999696', padding: '12px', textAlign: 'left', borderBottom: '1px solid #92d48d' }}>Supplier ID</th>
                                <th  style={{ backgroundColor: '#999696', padding: '12px', textAlign: 'left', borderBottom: '1px solid #92d48d' }}>Company Name</th>
                                <th  style={{ backgroundColor: '#999696', padding: '12px', textAlign: 'left', borderBottom: '1px solid #92d48d' }}>Address</th>
                                <th  style={{ backgroundColor: '#999696', padding: '12px', textAlign: 'left', borderBottom: '1px solid #92d48d' }}>Email</th>
                                <th  style={{ backgroundColor: '#999696', padding: '12px', textAlign: 'left', borderBottom: '1px solid #92d48d' }}>Contact</th>
                                <th  style={{ backgroundColor: '#999696', padding: '12px', textAlign: 'left', borderBottom: '1px solid #92d48d' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                showdiscounts.map((e1) => (
                                    <tr key={e1._id}>
                                        <td>{e1.supplier_name}</td>
                                        <td>{e1.company_name}</td>
                                        <td>{e1.address}</td>
                                        <td>{e1.email}</td>
                                        <td>{e1.contact}</td>
                                        <td>
                                            <a href={`/updateorder/${e1._id}`} className="edit-btn" style={{ textDecoration: 'none', padding: '4px 10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', marginRight: '5px' }}>Edit</a>
                                            <button onClick={() => handledelete(e1._id)} style={{ padding: '4px 10px', borderRadius: '5px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer', marginLeft: '0px',marginTop:'10px' }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <button onClick={generatePDF} style={{ marginTop: '20px', padding: '12px 24px', backgroundColor: '#28a745', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Download Report</button>
                </div>
            </div>
        </div>
    );
}

export default SupplierDetails;
