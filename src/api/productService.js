import api from './axiosConfig'; 


export const getAllProducts = async () => {
    const response = await api.get('/product/getAll');
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/product/read/${id}`);
    return response.data;
};

export const getProductsByCategory = async (categoryId) => {
    const response = await api.get(`/product/category/${categoryId}`);
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await api.post('/product/create', productData);
    return response.data;
};

export const updateProduct = async (productData) => {
    const response = await api.put('/formule/product/update', productData);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/formule/product/delete/${id}`);
    return response.data;
};