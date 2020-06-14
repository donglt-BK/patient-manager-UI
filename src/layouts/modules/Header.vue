<template>
    <el-header class="text-center" style="height: 50px;">
        <img @click="redirectHome" style="height: 80%; position: relative; top: 10%" src="../../assets/images/logo_c.png" alt="MAS Logo"/>
        <label class="system-name">Medical Appointment System</label>

        <div class="pull-right">
            <label style="margin-right: 20px;" @click="profile">
                <span>{{username}}</span>
            </label>
            <el-button class="logout  header-btn" @click="logout">Logout</el-button>
        </div>
    </el-header>
</template>

<script>
    import auth from "@/security/Authentication";
    import Pages from "@/router/Pages";

    export default {
        name: "Lefter",
        data() {
            return {
                username: auth.getCurrentUser() ? auth.getCurrentUser().username : "",
            }
        },
        methods: {
            profile() {
                this.$router.push({path: Pages.profile.path});
            },
            logout() {
                auth.logout();
                this.$router.push({path: "/login"});
            },
            redirectHome() {
                this.$router.push({path: Pages.home.path});
            }
        }
    };
</script>

<style scoped>
    .el-header {
        background-color: #27293d;
        color: #ffff;
        line-height: 50px;
    }

    .pull-right {
        float: right;
    }

    .header-btn {
        padding: 4px 17px;
        border-radius: 0;
    }

    .system-name {
        position: relative;
        left: 5px;
        top: -8px;
    }
</style>
