export const state = () => ({
    items: []
});

export const getters = {
    cartTotal: state => {
        let total = 0;
        state.items.forEach(function(item) {
            total += item.product.price * item.quantity;
        });

        return total;
    },
    getCartItem: state => product => {
        for (let i = 0; i < state.items.length; i++) {
            if (state.items[i].product.id === product.id) {
                return state.items[i];
            }
        }

        return null;
    },
    taxAmount: (state, getters) => percent => {
        return (getters.cartTotal * percent) / 100;
    }
};

export const actions = {
    addProductToCart(context, payload) {
        let cartItem = context.getters.getCartItem(payload.product);
        payload.cartItem = cartItem;
        if (cartItem == null) {
            context.commit("addProductToCart", payload);
        } else {
            context.commit("increaseProductQuantity", payload);
        }
    },
    removeProductFromCart(context, payload) {
        let cartItem = context.getters.getCartItem(payload.product);
        payload.cartItem = cartItem;
        context.commit("decreaseProductQuantity", payload);
        if (payload.cartItem.quantity == 0) {
            context.commit("removeItemFromCart", payload);
        }
    }
};

export const mutations = {
    addProductToCart(state, payload) {
        state.items.push({
            product: payload.product,
            quantity: payload.quantity
        });
        payload.product.inStock -= payload.quantity;
    },
    increaseProductQuantity(state, payload) {
        payload.cartItem.quantity += payload.quantity;
        payload.product.inStock -= payload.quantity;
    },
    decreaseProductQuantity(state, payload) {
        payload.cartItem.quantity -= payload.quantity;
        payload.product.inStock += payload.quantity;
    },
    removeItemFromCart(state, payload) {
        let index = state.items.indexOf(payload.cartItem);

        if (index !== -1) {
            state.items.splice(index, 1);
        }
    },
    checkout(state) {
        state.items.forEach(function(item) {
            item.product.inStock += item.quantity;
        });

        state.items = [];
    }
};
