import api from './axiosConfig';


export const createAdmin = async (adminData) => {
    const response = await api.post('/formule/admin/create', adminData);
    return response.data;
};


export const getAdminById = async (adminId) => {
    const response = await api.get(`/formule/admin/read/${adminId}`);
    return response.data;
};


export const updateAdmin = async (adminData) => {
    const response = await api.put('/formule/admin/update', adminData);
    return response.data;
};


export const deleteAdmin = async (adminId) => {
    const response = await api.delete(`/formule/admin/delete/${adminId}`);
    return response.data; 
};


export const getAllAdmins = async () => {
    const response = await api.get('/formule/admin/getAll');
    return response.data;
};