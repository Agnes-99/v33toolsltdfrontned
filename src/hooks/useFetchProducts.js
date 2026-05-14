import { useState, useEffect } from 'react';
import { getAllProducts } from '../api/productService';

export const useFetchProducts = (mockData) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getAllProducts();
                if (data && data.length > 0) {
                    setProducts(data);
                } else {
                    setProducts(mockData);
                }
            } catch (error) {
                console.error("API Offline, using mock data", error);
                setProducts(mockData);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [mockData]);

    return { products, loading };
};