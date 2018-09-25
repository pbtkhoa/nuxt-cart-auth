<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3 border-bottom">
        <div class="container">
            <nuxt-link to="/" class="navbar-brand">E-commerce Inc.</nuxt-link>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <nuxt-link class="nav-item" tag="li" :to="{name:'index'}" active-class="active" exact>
                        <a href="/" class="nav-link">Products</a>
                    </nuxt-link>
                    <nuxt-link class="nav-item" tag="li" :to="{name:'cart'}" active-class="active" exact>
                        <a href="/cart" class="nav-link">Cart</a>
                    </nuxt-link>
                </ul>
            </div>
            <div class="d-inline-block mr-2" v-if="isAuthenticated">
                <button class="btn btn-primary" @click="logout">Logout</button>
            </div>
            <div class="d-inline-block mr-2" v-else>
                <a href="#">My Profile</a>
                &nbsp;
                <nuxt-link class="btn btn-primary" :to="{name:'login'}">Login</nuxt-link>
            </div>
            <span class="navbar-text">
                <b>{{ cart.items.length }}</b>
                <template v-if="cart.items.length < 2"> item</template>
                <template v-else> items</template>
                in cart, totalling
                <b>{{ cartTotal | currency }}</b>
            </span>
        </div>
    </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
    computed: {
        ...mapState(["cart"]),
        ...mapGetters({
            cartTotal: "cart/cartTotal",
            isAuthenticated: "user/isAuthenticated"
        })
    },
    methods: {
        logout() {
            this.$store.dispatch("user/logout");
            this.$router.push({
                name: "index"
            });
        }
    }
};
</script>
