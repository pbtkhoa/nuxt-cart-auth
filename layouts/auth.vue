<template>
    <div>
        <header-vue></header-vue>
        <div class="container">
            <div class="col-6 offset-3">
                <nuxt/>
            </div>
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

