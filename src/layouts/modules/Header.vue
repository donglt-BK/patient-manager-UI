<template>
    <el-header class="text-left" style="height: 50px;">
        <img @click="redirectHome" style="height: 80%; margin-top: 10%; margin-left: 10px" src="../../assets/images/logo_c.png"
             alt="MAS Logo"/>

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
        name: "Header",
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
                console.log("logout");
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
    .link {
        margin: 0 10px;
    }

    .el-dropdown {
        margin-left: 10px;
    }

    .el-icon-setting {
        margin-right: 15px
    }

    .el-header {
        background-color: #27293d;
        color: #ffff;
        line-height: 50px;
    }

    .pull-right {
        float: right;
    }

    .change-lang, .logout, .change-pass {
        margin-left: 10px;
    }

    .header-btn {
        padding: 4px 17px;
        border-radius: 0;
    }

    .home {
        margin-right: 20px;
    }

    .home-icon {
        display: none;
    }

    @media only screen and (min-width: 768px) and (max-width: 1280px) {
        .el-header {
            font-size: 12px;
        }

        .header-btn {
            font-size: 12px;
        }

    }

    @media only screen and (max-width: 768px) {
        .change-lang {
            display: none;
        }

        .home-btn-with-text {
            display: none;
        }

        .home-icon {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 0;
        }

        .system-name {
            display: none;
        }
    }

</style>
