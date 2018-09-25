<template>
    <div>
        <header-vue></header-vue>
        <div class="container">
            <nuxt/>
        </div>
    </div>
</template>
<script>
import HeaderVue from "~/components/Header.vue";
export default {
    components: {
        HeaderVue
    }
};
</script>

