import api from './axiosConfig';


export const getCartByCustomerId = async (customerId) => {
    const response = await api.get(`/cart/findByCustomerId/${customerId}`);
    return response.data;
};

export const addToCart = async (customerId, productId, quantity = 1) => {
    const response = await api.post('/cart/add', null, {
        params: {
            customerId,
            productId,
            quantity
        }
    });
    return response.data;
};

export const removeFromCart = async (customerId, productId) => {
    const response = await api.delete('/cart/remove', {
        params: {
            customerId,
            productId
        }
    });
    return response.data;
};

export const getAllCarts = async () => {
    const response = await api.get('/cart/getall');
    return response.data;
};

export const deleteCart = async (id) => {
    await api.delete(`/cart/delete/${id}`);
};