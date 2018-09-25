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
                    <!-- <button class="btn btn-sm btn-success" @click="increaseQuantity(item)" :disabled="item.product.inStock == 0">+</button>&nbsp;
                    <button class="btn btn-sm btn-danger" @click="decreaseQuantity(item)">-</button> -->
                </td>
                <td>{{ item.quantity * item.product.price | currency }}</td>
            </tr>

            <tr>
                <td class="text-right" colspan="2">
                    <strong>Subtotal</strong>
                </td>

                <td>{{ cartTotal | currency }}</td>
            </tr>

            <!-- // <tr>
            //     <td class="text-right" colspan="2">
            //         <strong>Taxes</strong>
            //     </td>

            //     <td>{{ taxAmount(10) | currency }}</td>
            // </tr> -->

            <tr>
                <td class="text-right" colspan="2">
                    <strong>Coupon code</strong>
                </td>

                <td><input type="text" class="form-control" placeholder="Enter coupon code here"></td>
            </tr>

            <!-- <tr>
                <td class="text-right" colspan="2">
                    <strong>Grand total</strong>
                </td>

                <td>{{ cartTotal + taxAmount(10) | currency }}</td>
            </tr> -->

            <tr>
                <td class="text-right" colspan="2">
                    <span v-if="couponCode">
                        <em>Lucky you! You entered the following coupon code: {{ couponCode }}</em>
                    </span>
                </td>
                <td>
                    <button class="btn btn-success">Checkout</button>
                </td>
            </tr>
        </tbody>
    </table>

    <p v-else>Your cart is currently empty.</p>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
    computed: {
        ...mapState({
            cart: "cart"
        }),
        ...mapGetters({
            cartTotal: "cart/cartTotal"
        })
    }
};
</script>

<style scoped>
</style>
