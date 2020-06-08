<template>
    <div v-loading.fullscreen.lock="fullscreenLoading" class="login-wrapper">
        <el-row type="flex" justify="center" align="center" style="height: 100%;">
            <el-col :md="7" :sm="10" :lg="6" :xs="20" class="row vertical-center">
                <el-form v-loading="loading" :inline="false"
                         class="flex-1 form-style" :rules="rules"
                         :model="formData" :disabled="disableForm"
                         ref="loginForm">

                    <h3 class="text-center">
                        <label class="login-form-title">MEDICAL APPOINTMENT SYSTEM</label>
                    </h3>
                    <img style="width: 36%; margin-left: 32%" src="../../assets/images/logo_c.png" alt="MAS Logo"/>
                    <h5 class="text-center">Please login to continue</h5>
                    <el-form-item prop="username">
                        <el-input v-model="formData.username" placeholder="Username"
                                  @keypress.enter.native="next"/>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input ref="passwordInput" type="password" v-model="formData.password"
                                  placeholder="Password" @keypress.enter.native.prevent="onClickLogin"/>
                    </el-form-item>

                    <el-form-item>
                        <el-button class="btn-block custom-btn-color" @click="onClickLogin">Login</el-button>
                    </el-form-item>

                    <el-form-item>
                        <a @click="register">Don't have account? Create new one now</a>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Pages from "@/router/Pages";
    import LoginApi from '@/api/LoginApi';
    import Auth from '@/security/Authentication';
    import AlertService from "@/service/alert.service";

    export default {
        name: "Login",
        data() {
            return {
                rules: {
                    username: [{
                        required: true,
                        message: this.$t("login.pleaseEnterUsername"),
                        trigger: "blur"
                    }],
                    password: [{
                        required: true,
                        message: this.$t("login.pleaseEnterPassword"),
                        trigger: "blur"
                    }],
                },
                formData: {
                    password: "",
                    username: ""
                },
                disableForm: false,
                loading: false,
                fullscreenLoading: false,
            }
        },
        methods: {
            onClickLogin() {
                let vue = this;
                vue.$refs["loginForm"].validate(valid => {
                    if (valid) {
                        this.login();
                    }
                });
            },
            register() {
                LoginApi.register();
            },
            async login() {
                let loginData = {
                    username: this.formData.username,
                    password: this.formData.password
                };
                try {
                    this.fullscreenLoading = true;
                    let response = await LoginApi.login(loginData);
                    Auth.setCurrentUser(response.user);
                    this.goToHomePage();
                } catch (e) {
                    console.log("error", e);
                    if (e.response.status === 400) {
                        AlertService.error(this.$t("login.incorrect"));
                    } else {
                        AlertService.error(this.$t("common.serverErrorMessage"), 2000);
                        Auth.logout();
                    }
                } finally {
                    this.fullscreenLoading = false;
                }
            },
            goToHomePage() {
                this.$router.push({path: Pages.home.path});
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .login-form-title {
        border-bottom: 3px solid #EFB3B2;
        display: inline-block;
        padding-bottom: 5px;
    }

    .login-wrapper {
        height: 100%;
        background-color: whitesmoke;
    }
</style>
