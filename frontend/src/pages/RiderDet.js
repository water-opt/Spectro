import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import '../styles/RiderDet.css'

const RiderDet = () => {
    const { id } = useParams()
    const [ rider, setRider ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const fetchRider = async () => {
            try {
                const response = await axios.get(`/api/riders/${id}`)
                setRider(response.data)
                setLoading(false)
            } catch (error) {
                console.log(`Error: ${error}`)
            }
        }

        fetchRider()
    }, [id])

    return (
        <div className="riderr-details-container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Rider Details</h2>
                    <div className="riderr-details">
                        <p><strong>Name:</strong> {rider.name}</p>
                        <p><strong>Age:</strong> {rider.age}</p>
                        <p><strong>Contact Number:</strong> {rider.mobile}</p>
                        <p><strong>Address:</strong> {rider.address}</p>
                        <p><strong>NiC:</strong> {rider.nic}</p>
                        <div className="buttonn-group">
                            <Link to={`/edit/${id}`} className="editt-button">Edit</Link>
                            <button className="deletee-button">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RiderDet
