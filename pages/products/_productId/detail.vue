<template>
    <product-detail-vue :product="product" />
</template>

<script>
import ProductDetailVue from "~/components/ProductDetail.vue";
export default {
    components: {
        ProductDetailVue
    },
    props: {
        product: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped>
</style>
