<template>
    <div id="app" v-loading="loading">
        <router-view/>
    </div>
</template>
<script>
    import LoginApi from '@/api/LoginApi';
    import Auth from '@/security/Authentication';

    export default {
        name: "App",
        data() {
            return {
                loading: false
            }
        },
        created() {
        },
    }
</script>
<style lang="scss">
    #app {
        font-family: "Roboto", Helvetica, Arial, sans-serif;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    html, body, #app {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    #app > * {
        height: 100%;
    }

</style>
