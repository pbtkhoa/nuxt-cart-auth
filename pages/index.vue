<template>
    <product-list-vue :products="products"></product-list-vue>
</template>
<script>
import ProductListVue from "~/components/ProductList";
export default {
    async asyncData({ app }) {
        const products = await app.$axios.$get(`products`);
        return {
            products
        };
    },
    components: {
        ProductListVue
    }
};
</script>

<style scoped>
#products .item img {
    background-color: #000;
}
#products .item p.lead {
    margin-bottom: 0;
}
#products .item .number-in-stock {
    margin-right: 10px;
}
#products .item .number-in-stock.few {
    color: #e0a14f;
}
#products .item .number-in-stock.none {
    color: #c45e5e;
}
</style>
