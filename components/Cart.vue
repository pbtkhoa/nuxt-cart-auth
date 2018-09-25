<template>
    <table v-if="cart.items.length > 0" class="table table-striped">
        <thead>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(item, index) in cart.items" :key="index">
                <td>{{ item.product.name }}</td>
                <td>
                    {{ item.quantity }} &nbsp;
                    <button class="btn btn-sm btn-success" @click="increaseQuantity(item)" :disabled="item.product.inStock == 0">+</button>&nbsp;
                    <button class="btn btn-sm btn-danger" @click="decreaseQuantity(item)">-</button>
                </td>
                <td>{{ item.quantity * item.product.price | currency }}</td>
            </tr>

            <tr>
                <td class="text-right" colspan="2">
                    <strong>Subtotal</strong>
                </td>

                <td>{{ cartTotal | currency }}</td>
            </tr>

            <tr>
                <td class="text-right" colspan="2">
                    <strong>Taxes</strong>
                </td>

                <td>{{ taxAmount(5) | currency }}</td>
            </tr>

            <tr>
                <td class="text-right" colspan="2">
                    <strong>Coupon code</strong>
                </td>

                <td><input type="text" class="form-control" placeholder="Enter coupon code here" v-model="couponCode"></td>
            </tr>

            <tr>
                <td class="text-right" colspan="2">
                    <strong>Grand total</strong>
                </td>

                <td>{{ cartTotal + taxAmount(5) | currency }}</td>
            </tr>

            <tr>
                <td class="text-right" colspan="2">
                    <span v-if="couponCode">
                        <em>Lucky you! You entered the following coupon code: {{ couponCode }}</em>
                    </span>
                </td>
                <td>
                    <button class="btn btn-success" @click="checkout">Checkout</button>
                </td>
            </tr>
        </tbody>
    </table>

    <p v-else>Your cart is currently empty.</p>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
    data() {
        return {
            couponCode: ""
        };
    },
    computed: {
        ...mapState({
            cart: "cart"
        }),
        ...mapGetters({
            cartTotal: "cart/cartTotal",
            taxAmount: "cart/taxAmount"
        })
    },
    methods: {
        increaseQuantity(cartItem) {
            this.$store.dispatch("cart/addProductToCart", {
                product: cartItem.product,
                quantity: 1
            });
        },
        decreaseQuantity(cartItem) {
            this.$store.dispatch("cart/removeProductFromCart", {
                product: cartItem.product,
                quantity: 1
            });
        },
        checkout() {
            if (confirm("Are you sure to buy these products?")) {
                this.$store.commit("cart/checkout");
            }
        }
    }
};
</script>

<style scoped>
</style>
