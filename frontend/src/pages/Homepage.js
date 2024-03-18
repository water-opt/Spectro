import React from 'react'
import HotDeals from '../components/HotDeals'
import About from '../components/About'
import Products from '../components/Products/Products'
import TrustedCompanies from '../components/TrustedCompanies'
import Testimonials from '../components/Testimonials'
import Home from '../components/Home'

const Homepage = () => {
    return (
        <div>
            <Home/>
            <TrustedCompanies/>
            <HotDeals/>
            <Products/>
            <Testimonials/>
            <About/>
        </div>
    )
}

export default Homepage