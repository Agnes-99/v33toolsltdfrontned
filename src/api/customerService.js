import api from './axiosConfig';


export const registerCustomer = async (customerData) => {
    const response = await api.post('/customer/create', customerData);
    return response.data;
};

export const getCustomerById = async (customerId) => {
    const response = await api.get(`/customer/read/${customerId}`);
    return response.data;
};

export const updateCustomer = async (customerData) => {
    const response = await api.put('/customer/update', customerData);
    return response.data;
};

export const deleteCustomer = async (customerId) => {
    const response = await api.delete(`/customer/delete/${customerId}`);
    return response.data;
};

export const getAllCustomers = async () => {
    const response = await api.get('/customer/getAll');
    return response.data;
};