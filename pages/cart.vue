<template>
    <div>
        <h1>Cart</h1>

        <cart-vue/>
    </div>
</template>

<script>
import CartVue from "~/components/Cart.vue";
export default {
    components: {
        CartVue
    },
    middleware: "authenticate"
};
</script>
