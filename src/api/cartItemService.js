import api from './axiosConfig';

// Useful for a "Quick View" of an item
export const getCartItemById = async (id) => {
    const response = await api.get(`/cart-items/${id}`);
    return response.data;
};

// PATCH update for a single item row
export const patchItemQuantity = async (id, quantity) => {
    const response = await api.patch(
        `/cart-items/${id}/quantity`,
        null,
        { params: { quantity } }
    );
    return response.data;
};

// Direct delete by Item ID
export const deleteCartItem = async (id) => {
    await api.delete(`/cart-items/${id}`);
};