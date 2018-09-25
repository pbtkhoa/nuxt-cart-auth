<template>
    <div>
        <p>
            <strong>ID:</strong> {{ product.id }}</p>
        <p>
            <strong>Price:</strong> {{ (product.price - discount) | currency }}
            <span v-if="discount > 0">(save {{ discount | currency }})</span>
        </p>
        <p>
            <strong>In stock:</strong> {{ product.inStock }}</p>
        <p>{{ product.description }}</p>
        <div v-if="relatedProducts != null" id="related">
            <h2>Related Products</h2>
            <ul>
                <li v-for="relatedProduct in relatedProducts" :key="relatedProduct.id">
                    <nuxt-link :to="{ name: 'products-productId-detail', params: { productId: relatedProduct.id }}">{{ relatedProduct.name }}</nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            products: [],
            discount: 0
        };
    },
    async created() {
        const products = await this.$axios.$get(`products`);
        this.products = products;

        if (typeof this.$route.query.discount !== "undefined") {
            this.discount = this.getDiscount(this.product.price, this.$route.query.discount);
        }
    },
    methods: {
        getDiscount(originalPrice, percentage) {
            if (!percentage) {
                return 0;
            }

            return originalPrice * percentage / 100;
        }
    },
    computed: {
        relatedProducts() {
            var productId = this.$route.params.productId;
            if (this.product === null) {
                return [];
            }

            return this.products.filter(function(product) {
                return product.id != productId;
            });
        }
    }
};
</script>

<style scoped>
</style>
