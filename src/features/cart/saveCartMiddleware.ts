import { Middleware } from "@reduxjs/toolkit";

const saveCartMiddleware: Middleware = store => next => action => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem('cart', JSON.stringify(state.cart));
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    localStorage.setItem('productViewedHistory', JSON.stringify(state.history));
    return result;
};

export default saveCartMiddleware;