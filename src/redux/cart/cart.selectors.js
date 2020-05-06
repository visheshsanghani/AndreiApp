import { createSelector } from 'reselect';

const selectCart = state => state.cart;

//Input Selector
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
)


export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
);

//Output Selector
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (accumalatedQuantity, cartItems) =>
            accumalatedQuantity + cartItems.quantity,
        0
    )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (accumalatedQuantity, cartItems) =>
            accumalatedQuantity + cartItems.quantity * cartItems.price,
        0
    )
)
