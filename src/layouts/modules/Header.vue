<template>
    <el-header class="text-center header darkest-blue">
        <div @click="redirectHome" class="logo-wrapper">
            <img style="height: 80%; position: relative; top: 10%" src="../../assets/images/logo_w.png" alt="MAS Logo"/>
            <label class="system-name">Medical Appointment System</label>
        </div>

        <div class="user-wrapper">
            <label style="margin-right: 20px;" @click="profile">
                <span>{{username}}</span>
            </label>
            <el-button class="btn no-radius light-blue" @click="logout">Logout</el-button>
        </div>
    </el-header>
</template>

<script>
    import Pages from "@/router/Pages";

    export default {
        name: "Lefter",
        data() {
            return {
                username: this.$auth.getCurrentUser() ? this.$auth.getCurrentUser().username : "",
            }
        },
        methods: {
            profile() {
                this.$router.push({path: Pages.profile.path});
            },
            logout() {
                this.$auth.logout();
                this.$router.push({path: "/login"});
            },
            redirectHome() {
                this.$router.push({path: Pages.home.path});
            }
        }
    };
</script>

<style scoped lang="scss">
    .header {
        line-height: 60px;
        height: 60px;
        position: relative;

        * {
            color: white;
        }

        .logo-wrapper {
            height: 100%;
            width: fit-content;
            cursor: pointer;
            display: inline-block;


            .system-name {
                color: white;
                cursor: pointer;
                position: relative;
                padding-left: 15px;
                top: -8px;
            }
        }

        .user-wrapper {
            position: absolute;
            top: 0;
            right: 20px;
        }
    }

</style>
