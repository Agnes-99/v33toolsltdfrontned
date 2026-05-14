import api from './axiosConfig';


export const getItemsByCartId = async (cartId) => {
    const response = await api.get(`/cart-items/findByCartId/${cartId}`);
    return response.data;
};

export const createCartItem = async (cartItemData) => {
    const response = await api.post('/cart-items/create', cartItemData);
    return response.data;
};

export const updateCartItem = async (cartItemData) => {
    const response = await api.put('/cart-items/update', cartItemData);
    return response.data;
};

export const deleteCartItem = async (id) => {
    await api.delete(`/cart-items/delete/${id}`);
};

export const getCartItemById = async (id) => {
    const response = await api.get(`/cart-items/read/${id}`);
    return response.data;
};

export const getAllCartItems = async () => {
    const response = await api.get('/cart-items/getAll');
    return response.data;
};