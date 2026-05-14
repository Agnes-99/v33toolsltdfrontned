import api from './axiosConfig';


export const createAddress = async (addressData) => {
    const response = await api.post('/formule/address/create', addressData);
    return response.data;
};

export const getAddressById = async (id) => {
    const response = await api.get(`/formule/address/read/${id}`);
    return response.data;
};

export const updateAddress = async (addressData) => {
    const response = await api.put('/formule/address/update', addressData);
    return response.data;
};

export const deleteAddress = async (id) => {
    const response = await api.delete(`/formule/address/delete/${id}`);
    return response.data; // Returns boolean
};

export const getAddressesByCustomerId = async (customerId) => {
    const response = await api.get(`/formule/address/customer/${customerId}`);
    return response.data;
};

export const getAllAddresses = async () => {
    const response = await api.get('/formule/address/getall');
    return response.data;
};