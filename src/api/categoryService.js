import api from './axiosConfig';


export const getAllCategories = async () => {
    const response = await api.get('/category/getAll');
    return response.data;
};


export const getCategoryById = async (id) => {
    const response = await api.get(`/category/read/${id}`);
    return response.data;
};


export const getCategoriesByName = async (name) => {
    const response = await api.get(`/category/search/name/${name}`);
    return response.data;
};


export const searchCategoriesByDescription = async (keyword) => {
    const response = await api.get('/category/search/description', {
        params: { keyword }
    });
    return response.data;
};


export const createCategory = async (categoryData) => {
    const response = await api.post('/category/create', categoryData);
    return response.data;
};


export const updateCategory = async (categoryData) => {
    const response = await api.put('/category/update', categoryData);
    return response.data;
};


export const deleteCategory = async (id) => {
    const response = await api.delete(`/category/delete/${id}`);
    return response.data; 
};