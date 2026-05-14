import api from './axiosConfig';


export const createOrder = async (orderData) => {
    const response = await api.post('/formule/order/create', orderData);
    return response.data;
};

export const getOrderById = async (orderId) => {
    const response = await api.get(`/formule/order/read/${orderId}`);
    return response.data;
};

export const updateOrder = async (orderData) => {
    const response = await api.put('/formule/order/update', orderData);
    return response.data;
};

export const deleteOrder = async (orderId) => {
    await api.delete(`/formule/order/delete/${orderId}`);
};

export const getAllOrders = async () => {
    const response = await api.get('/formule/order/getall');
    return response.data;
};