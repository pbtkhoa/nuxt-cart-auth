<template>
    <div class="card-columns" id="products">
        <div class="card item" v-for="product in products" :key="product.id">
            <img class="card-img-top" src="http://placehold.it/400x250/000/fff" @click="clickedImage(product)">
            <div class="card-body">
                <nuxt-link :to="{name:'products-productId-detail', params: {productId: product.id}}">{{ product.name }}</nuxt-link>

                <p class="card-text">{{ product.description }}</p>
                <br>

                <div class="row flex flex-row align-center">
                    <div class="col-sm-4">
                        <p class="lead">{{ product.price | currency }}</p>
                    </div>

                    <div class="col-sm-8 d-flex flex-row align-items-center justify-content-end">
                        <small class="number-in-stock" :class="{ few: product.inStock < 10 && product.inStock > 0, none: product.inStock == 0 }">
                            {{ product.inStock }} in stock
                        </small>
                        <button class="btn btn-success ml-2" @click="addProductToCart(product, 1)" :disabled="product.inStock == 0">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        products: {
            type: Array
        }
    },
    methods: {
        addProductToCart(product, quantity) {
            this.$store.dispatch("cart/addProductToCart", {
                product,
                quantity
            });
        },
        clickedImage(product) {
            this.$router.push({
                name: "products-productId-detail",
                params: {
                    productId: product.id
                },
                query: {
                    discount: 10
                }
            });
        }
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
