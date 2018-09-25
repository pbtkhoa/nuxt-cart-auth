<template>
    <login-vue/>
</template>

<script>
import LoginVue from "~/components/Login.vue";
export default {
    layout: "auth",
    middleware: "guest",
    components: {
        LoginVue
    }
};
</script>

<style scoped>
</style>
