import React from "react";

const AdminActionBtns = () => (
    <div className='bg-light my-2'>
        <div className='container'>
            <div className='row pb-3'>
                <div className='col-md-6  my-1'>
                    <button className='btn btn-outline-primary btn-block' style={{ width: '500px' }} data-bs-toggle='modal' data-bs-target='#addCategoryModal'>
                        <i className='fas fa-plus'></i> Add Category
                    </button>
                </div>

                <div className='col-md-6  my-1'>
                    <button className='btn btn-outline-info btn-block' style={{ width: '500px' }} data-bs-toggle='modal' data-bs-target='#addProductModal' >
                        <i className='fas fa-plus'></i> Add product
                    </button>
                </div>


            </div>
        </div>
    </div>
);

export default AdminActionBtns;