import { useReducer } from "react";
import CartContext from "./cart-context";


const defaultCartState = {
    items: [],
    totalAmpunt: 0
}

// Reducer Function
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmpunt + action.item.price * action.item.amount;

        return {
            items: updatedItems,
            totalAmpunt: updatedTotalAmount
        };
    }
    return defaultCartState;
};



const CartProvider = props => {
    /*state,action */
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemToCartHandler = item => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        });
    };
    const removeItemFromCartHandler = id => {
        dispatchCartAction({
            type: 'REMOVE',
            id
        });
    };

    const cartContext = {
        items: cartState.items,
        totalAmpunt: cartState.totalAmpunt,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;