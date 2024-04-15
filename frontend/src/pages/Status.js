import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AcceptedOrders = () => {
  const [orderCaptured, setOrder] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('');
  const { orderId } = useParams();

  useEffect(() => {
    const fetchAcceptedOrders = async () => {
      try {
        const response = await axios.get(`/api/order/rider/${orderId}`);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchAcceptedOrders();
  }, [orderId]);

  const handleStatusUpdate = async () => {
    try {
      await axios.put(`/api/order/${orderId}`, { status });
      // Assuming successful update, you can show a success message or redirect
      console.log('Status updated successfully');
    } catch (error) {
      console.log('Error updating status', error);
    }
  };

  return (
    <div className="container mt-5" style={{ marginBottom: '200px' }}>
      {isLoading && (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && <p className="text-danger text-center mt-5">Error fetching data</p>}
      {orderCaptured && (
        <div className="row rounded shadow-sm bg-light">
          <div className="col-md-6 border-right">
            <h2 className="text-center py-4">Order Details</h2>
            <div className="d-flex flex-column align-items-center mb-3">
              <p className="fw-bold mb-0">Order ID: #{orderCaptured._id}</p>
              <p className="text-muted">Assigned to You</p>
            </div>
            <div className="d-flex mb-3">
              <span className="fw-bold me-2">User:</span>
              <span>{orderCaptured.user.username}</span>
            </div>
            <div className="d-flex mb-3">
              <span className="fw-bold me-2">Email:</span>
              <span>{orderCaptured.user.email}</span>
            </div>
            <div className="d-flex mb-3">
              <span className="fw-bold me-2">Address:</span>
              <span>{orderCaptured.user.address}</span>
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="text-center py-4">Order Summary</h2>
            <div className="d-flex mb-3 justify-content-between">
              <span className="fw-bold">Status:</span>
              <span>{orderCaptured.order.status}</span>
            </div>
            <div className="d-flex mb-3 justify-content-between">
              <span className="fw-bold">Total:</span>
              <span>{orderCaptured.order.total}</span>
            </div>
            <div className="form-group">
              <label htmlFor="status">Update Status:</label>
              <select
                id="status"
                className="form-control form-select-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="out for delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <button
              className="btn btn-primary mt-3 shadow-sm d-block mx-auto"
              onClick={handleStatusUpdate}
            >
              Update Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptedOrders;
