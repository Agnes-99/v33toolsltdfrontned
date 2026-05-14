import api from './axiosConfig';

// ======================================================
// CHECKOUT (CREATE ORDER FROM CART)
// ======================================================
export const checkoutOrder = async (cart) => {
    const response = await api.post('/orders/checkout', cart);
    return response.data;
};

// ======================================================
// GET ORDER BY ID
// ======================================================
export const getOrderById = async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
};

// ======================================================
// DELETE ORDER
// ======================================================
export const deleteOrder = async (orderId) => {
    await api.delete(`/orders/${orderId}`);
};

// ======================================================
// GET ALL ORDERS (ADMIN/MANAGER)
// ======================================================
export const getAllOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
};