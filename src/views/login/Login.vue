<template>
    <div v-loading.fullscreen.lock="fullscreenLoading" class="login-wrapper">
        <el-row type="flex" justify="center" align="center" style="height: 100%;">
            <el-col :md="14" :sm="14" :lg="10" :xs="20" class="row vertical-center">
                <el-form v-loading="loading" :inline="false"
                         class="flex-1 form-style" :rules="rules"
                         :model="formData" :disabled="disableForm"
                         ref="loginForm">

                    <h3 class="text-center" style="width: 100%">
                        <label class="login-form-title">MEDICAL APPOINTMENT SYSTEM</label>
                    </h3>
                    <div class="clearfix" style="margin-top: 25px">
                        <img style="width: 164px; float: left" src="../../assets/images/logo_c.png" alt="MAS Logo"/>
                        <div style="width: calc(100% - 164px); padding-left: 20px; float: right">
                            <el-form-item prop="username">
                                <el-input v-model="formData.username" placeholder="Username"
                                          @keypress.enter.native="next"/>
                            </el-form-item>

                            <el-form-item prop="password">
                                <el-input ref="passwordInput" type="password" v-model="formData.password"
                                          placeholder="Password" @keypress.enter.native.prevent="onClickLogin"/>
                            </el-form-item>

                            <el-form-item>
                                <el-button class="btn darken-blue login-btn" @click="onClickLogin">Login</el-button>
                            </el-form-item>
                        </div>
                    </div>
                    <el-form-item style="text-align: center; margin-bottom: 0;">
                        <a>Don't have account? Create <span class="link" @click="register">new</span> one now</a>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Pages from '../../router/Pages';
    import UserApi from '../../api/UserApi';

    export default {
        name: "Login",
        data() {
            return {
                rules: {
                    username: [{
                        required: true,
                        message: "Missing username",
                        trigger: "blur"
                    }],
                    password: [{
                        required: true,
                        message: "Missing password",
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
                this.$router.push({path: Pages.register.path});
            },
            async login() {
                let loginData = {
                    username: this.formData.username,
                    password: this.formData.password
                };
                try {
                    this.fullscreenLoading = true;
                    await UserApi.login(loginData);
                    let response = await UserApi.refresh();
                    console.log(response)
                    this.$auth.setCurrentUser(response);
                    this.goToHomePage();
                } catch (e) {
                    if (e.response) {
                        if (e.response.status === 400) {
                            this.$services.alert.error("Wrong username or password");
                        } else {
                            this.$services.alert.error(this.$t("common.serverErrorMessage"), 2000);
                            this.$auth.logout();
                        }
                    } else {
                        console.log(e)
                    }
                } finally
                    {
                        this.fullscreenLoading = false;
                    }
                }
            ,
                goToHomePage()
                {
                    this.$router.push({path: Pages.home.path});
                }
            }
        }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/var";

    /deep/ .login-form-title {
        width: 100%;
        border-bottom: 3px solid $color-darkest-blue;
        display: inline-block;
        padding-bottom: 5px;
    }

    .login-btn {
        width: 100%;
    }

    .login-wrapper {
        height: 100%;
        background-color: $color-lightest-blue;
    }

    .link {
        color: $color-blue;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
</style>
