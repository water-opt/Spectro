import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DeliveryMain.css';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { useRole } from '../components/RoleContext';
import DeliveryHeader from '../components/DeliveryAdminHeader';

const DeliveryDashboardAdmin = () => {
  const [pending, setPending] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [cancelled, setCancelled] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [ridersCount, setRidersCount] = useState(null);
  const [vehicleCount, setVehicleCount] = useState(null);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const { role } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/login');
    } else {
      axios.get('/api/orders/pending')
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Failed to fetch data');
          }
          setPending(response.data);
          return axios.get('/api/orders/processing');
        })
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Failed to fetch data');
          }
          setProcessing(response.data);
          return axios.get('/api/orders/cancelled');
        })
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Failed to fetch data');
          }
          setCancelled(response.data);
          return axios.get('/api/riders')
        })
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Failed to fetch data');
          }
          setRidersCount(response.data.length);
          return axios.get('/api/deliveryvehicles')
        })
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Failed to fetch data');
          }
          setVehicleCount(response.data.length);
          return axios.get('/api/orders/pending');
        })
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Failed to fetch data');
          }
          setPendingOrdersCount(response.data.length);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setErrors(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [role, navigate]);

  useEffect(() => {
    if (pending && processing && cancelled) {
      const totalPending = pending.length;
      const totalProcessing = processing.length;
      const totalCancelled = cancelled.length;

      setChartData({
        labels: ['Pending', 'Processing', 'Cancelled'],
        datasets: [{
          data: [totalPending, totalProcessing, totalCancelled],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)'
          ],
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)'
          ]
        }]
      });
    }
  }, [pending, processing, cancelled]);

  return (
    <div style={{ marginBottom: '100px' }}>
      <div className='bg-dark text-white py-4' style={{ marginBottom: '20px' }}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <h1 style={{ fontStyle: "italic" }}>
                Delivery Management
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='upper-container'>
          <DeliveryHeader />
        </div>
        <div className='upper-container'>
          <div className='upper-right-container'>
            <h2>Order Status</h2>
            <div className='chart-container'>
              {chartData ? (
                <Doughnut key={JSON.stringify(chartData)} data={chartData} />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>
          </div>
          <div className='upper-left-container' style={{ marginLeft: '20px' }}>
            <div className='stats-container'>
              <div className='stat-item'>
                <p>Total Riders</p>
                <p>{ridersCount}</p>
              </div>
              <div className='stat-item'>
                <p>Total Vehicles</p>
                <p>{vehicleCount}</p>
              </div>
              <div className='stat-item'>
                <p>Orders to be Fulfilled</p>
                <p>{pendingOrdersCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboardAdmin;
