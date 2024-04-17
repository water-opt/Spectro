import '../styles/HeaderDelivery.css'
import { Link } from 'react-router-dom'

const DeliveryHeader = () => {
    return (
        <div className='navigation'>
                <li>
                  <Link to='/riders/registrationform'>
                    <button className='fas fa-user-plus'></button> <label>New Riders</label>
                  </Link>
                </li>
                <li>
                  <Link to='/vehicles/registrationform'>
                    <button className='fas fa-truck-pickup'></button> <label>New Vehicles</label>
                  </Link>
                </li>
                <li>
                  <Link to='/riders/dashboard'>
                    <button className='fas fa-users'></button> <label>All Riders</label>
                  </Link>
                </li>
                <li>
                  <Link to='/vehicles/dashboard'>
                    <button className='fas fa-truck'></button> <label>All Vehicles</label>
                  </Link>
                </li>
        </div>
    )
}

export default DeliveryHeader