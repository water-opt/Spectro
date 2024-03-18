import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Orders.css'

const Orders = () => {
    const [orders, setOrders] = useState(null)
    const [filteredOrders, setFilteredOrders] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [dateFilter, setDateFilter] = useState(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const OrdersRawDetails = await fetch('/api/orders')
                const OrdersJson = await OrdersRawDetails.json()
                setOrders(OrdersJson)
                setLoading(false)
            } catch (error) {
                setError(true)
            }
        }

        fetchOrders()
    }, [])

    useEffect(() => {
        filterOrders()
    }, [orders, searchQuery, dateFilter])

    const filterOrders = () => {
        if (!orders) return

        let filtered = orders

        // Apply search by title filter
        if (searchQuery) {
            filtered = filtered.filter(order => order.product && order.product.title.toLowerCase().includes(searchQuery.toLowerCase()))
        }

        // Apply date filter
        if (dateFilter) {
            filtered = filtered.filter(order => new Date(order.createdAt) >= dateFilter)
        }

        setFilteredOrders(filtered)
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const handleDateChange = (event) => {
        const date = event.target.value ? new Date(event.target.value) : null
        setDateFilter(date)
    }

    if (error) {
        return (
            <div>
                An error occurred ...
            </div>
        )
    } else if (isLoading) {
        return (
            <div>
                Loading ...
            </div>
        )
    }

    return (
        <div>
            <div style={{ marginTop: '30px' }}>
                <div style={{ marginLeft: '50px' }}>
                    <div>
                        <p style={{ fontSize: '25px', fontWeight: 'bold' }}>Order History</p>
                        <p>Manage your recent orders and invoices.</p>
                        <div className='search-and-filter'>
                            <input className='search' type="text" placeholder="Search by title" value={searchQuery} onChange={handleSearchChange} />
                            <input className='filter' type="date" onChange={handleDateChange} />
                        </div>
                    </div>
                </div>
                <div className="vertical-line" style={{ borderTop: '2px solid #D3D3D3', width: '94%', margin: '0 auto' }}></div>
                <p style={{ marginTop: '28px', marginLeft: '50px' }} ><span style={{ fontSize: '17px', fontWeight: 'bold' }}>Order Details</span><br />Review and manage recent orders</p>
                <div style={{ marginBottom: '100px' }} >
                    <div style={{ marginLeft: '400px', marginRight: '50px' }}>
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th className="col"></th>
                                    <th className="col">Date</th>
                                    <th className="col">Quantity</th>
                                    <th className="col">Status</th>
                                    <th className="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders && filteredOrders.map((order) => (
                                    <tr key={order._id}>
                                        {/* <td>{order._id}</td> */}
                                        <td><Link to={`/orders/management/${order._id}`}>{order.product ? order.product.title : 'N/A'}</Link></td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.status}</td>
                                        <td>LKR {order.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders
