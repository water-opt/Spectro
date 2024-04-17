import { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import '../styles/VehicleDash.css'

const Vehicles = () => {
    const [riders, setRiders] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedRider, setSelectedRider] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchRiders = async () => {
            try {
                const RidersRaw = await fetch('/api/riders')
                const RidersJson = await RidersRaw.json()
                setRiders(RidersJson)
                setLoading(false)
            } catch (errors) {
                console.log(errors)
            }
        }

        fetchRiders()
    }, [])

    const handleRiderClick = (rider) => {
        setSelectedRider(rider)
    }

    const handleCloseModal = () => {
        setSelectedRider(null)
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const DeleteHandler = async (id, name) => {
        if (window.confirm(`Please confirm the deletion of rider '${name}'`)) {
            try {
                await axios.delete(`/api/riders/${id}`)
                setRiders(riders.filter(rider => rider._id !== id))
                setSelectedRider(null)
                if (alert('Successfully Deleted ...')) {
                    handleCloseModal()
                }               
            } catch (error) {
                console.log('Error deleting rider:', error)
            }
        }
    }
    

    const EditHandler = (id, name) => {
        
    }

    const filteredRiders = riders ? riders.filter(rider => rider.name.toLowerCase().includes(searchTerm.toLowerCase())) : []

    return (
        <div>
            <div style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '50px' }}>
                    <div>
                        <p style={{ fontSize: '25px', fontWeight: 'bold' }}>Riders History</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '50px', marginBottom: '10px', border: 'solid', borderColor: '#F8F8FF' }}>
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{
                                marginRight: '10px',
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                        />
                        <button style={{
                            padding: '5px 10px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}>Search</button>
                    </div>
                </div>
                <div className="vertical-line" style={{ borderTop: '2px solid #D3D3D3', width: '94%', margin: '0 auto' }}></div>
                <div style={{ marginBottom: '100px' }}>
                    <div style={{ marginLeft: '400px', marginRight: '50px', marginTop: '100px' }}>
                        {loading && <div>Loading ...</div>}
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th className="col">Driver</th>
                                    <th className="col">Contact Number</th>
                                    <th className="col">NiC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRiders.map((rider) => (
                                    <tr key={rider._id} onClick={() => handleRiderClick(rider)}>
                                        <td>{rider.name}</td>
                                        <td>{rider.mobile}</td>
                                        <td>{rider.nic}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {selectedRider && (
                <div className="VehiclesDash-modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2 style={{ fontWeight: '700', marginBottom: '15px' }}>{selectedRider.name}'s Details</h2>
                        <p>Age: <input value={selectedRider.age} /></p>
                        <p>Contact Number: <input value={selectedRider.mobile} /></p>
                        <p>Address: <input style={{ width: '500px' }}value={selectedRider.address} /></p>
                        <p>NiC: <input value={selectedRider.nic} /></p>
                        <div style={{ marginLeft: '890px' }} className="button-container">
                            <button className="editt-button" onClick={() => EditHandler(selectedRider._id, selectedRider.name)}>Edit</button>
                            <button className="deletee-button" onClick={() => DeleteHandler(selectedRider._id, selectedRider.name)}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Vehicles
