import api from './axiosConfig';

export const createManager = async (managerData) => {
    const response = await api.post('/formule/manager/create', managerData);
    return response.data;
};

export const getManagerById = async (managerId) => {
    const response = await api.get(`/formule/manager/read/${managerId}`);
    return response.data;
};

export const updateManager = async (managerData) => {
    const response = await api.put('/formule/manager/update', managerData);
    return response.data;
};

export const deleteManager = async (managerId) => {
    const response = await api.delete(`/formule/manager/delete/${managerId}`);
    return response.data; // Returns boolean
};

export const getAllManagers = async () => {
    const response = await api.get('/formule/manager/getAll');
    return response.data;
};