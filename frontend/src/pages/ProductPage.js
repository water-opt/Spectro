import React from 'react'
import { useState, useEffect } from 'react'

const Products = () => {
    const [isLoading, setLoading] = useState(null)
    const [error, setErrors] = useState(false)
    const [products, setProducts] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                isLoading(true)
                const productsRaw = await fetch('/api/products')
                const productsJson = productsRaw.json()
                setProducts(productsJson)
                isLoading(false)
            } catch (error) {
                setErrors(true)
            }
        }

        fetchProducts()
    }, [])

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
            
        </div>
    )
} 