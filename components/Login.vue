<template>
    <form @submit.prevent="login">
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" placeholder="Username" v-model="username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
        </div>
        <div class="form-group" v-if="error != ''">
            <div class="alert alert-danger" role="alert">
                This is a danger alert—check it out!
            </div>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
            error: ""
        };
    },
    methods: {
        async login() {
            try {
                let user = await this.$store.dispatch("user/login", {
                    username: this.username,
                    password: this.password
                });
                this.error = "";
                this.$router.push({
                    name: "index"
                });
            } catch (error) {
                this.error = "Username or password is incorrect!!";
            }
        }
    }
};
</script>

<style scoped>
</style>
