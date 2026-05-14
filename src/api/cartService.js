import api from './axiosConfig';

/**
 * FETCH: Get or initialize cart for a specific customer.
 */
export const getCartByCustomerId = async (customerId) => {
    const response = await api.get(`/cart/customer/${customerId}`);
    return response.data;
};

/**
 * ADD: Adds a product to the cart. Returns the full updated Cart object.
 */
export const addToCart = async (customerId, productId, quantity = 1) => {
    const response = await api.post(
        `/cart/customer/${customerId}/items`,
        null, 
        { params: { productId, quantity } }
    );
    return response.data;
};

/**
 * UPDATE: Updates the total quantity for a specific product in the cart.
 */
export const updateCartQuantity = async (customerId, productId, quantity) => {
    const response = await api.put(
        `/cart/customer/${customerId}/items/${productId}`,
        null,
        { params: { quantity } }
    );
    return response.data;
};

/**
 * REMOVE: Deletes a product from the cart completely.
 */
export const removeFromCart = async (customerId, productId) => {
    const response = await api.delete(`/cart/customer/${customerId}/items/${productId}`);
    return response.data;
};