<template>
    <div v-if="product != null">
        <!-- <button class="btn btn-primary mr-2" @click="goBack">&laquo; Back</button> -->
        <!-- <button class="btn btn-success mr-2" @click="addProductToCart({product: product, quantity: 1})">Add to cart</button> -->
        <h1>{{ product.name }}</h1>

        <ul class="nav nav-pills">
            <li class="nav-item">
                <nuxt-link class="nav-link" :to="{name:'products-productId-detail', params: { productId: product.id}}" active-class="active">Details</nuxt-link>
            </li>
            <li class="nav-item">
                <nuxt-link class="nav-link" :to="{name:'products-productId-review', params: { productId: product.id}}" active-class="active">Reviews</nuxt-link>
            </li>
        </ul>

        <hr>
        <nuxt-child :product="product" />
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
export default {
    async asyncData({ app, params }) {
        const product = await app.$axios.$get(`products/${params.productId}`);
        return {
            product
        };
    }
};
</script>

<style scoped>
</style>
