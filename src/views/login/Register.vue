<template>
    <div class="user-info-wrapper">
        <div class="info" v-loading="loading">
            <h3 style="margin-top: 0; text-align: center">CREATE ACCOUNT</h3>
            <InputLabel style='width: 145px' text="Username" :required="true"/>
            <el-input class="input" v-model="userInfo.username"></el-input>

            <InputLabel style='width: 145px' text="Password" :required="true"/>
            <el-input class="input" type="password" v-model="userInfo.password"></el-input>


            <InputLabel style='width: 145px' text="Name" :required="true"/>
            <el-input class="input" v-model="userInfo.name"></el-input>

            <div style="display: flex">
                <div style="flex: 5; margin-right: 5px">

                    <InputLabel style='width: 145px' text="Gender" :required="true"/>
                    <el-select class="input" v-model="userInfo.gender">
                        <el-option label="Male" value="MALE"/>
                        <el-option label="Female" value="FEMALE"/>
                    </el-select>

                    <InputLabel style='width: 145px' text="Phone" :optional="true"/>
                    <el-input class="input" v-model="userInfo.phone"></el-input>
                </div>
                <div style="flex: 7; margin-left: 5px">
                    <InputLabel style='width: 145px' text="Date of Birth" :required="true"/>
                    <el-date-picker class="input" v-model="userInfo.dob"></el-date-picker>

                    <InputLabel style='width: 145px' text="Email" :optional="true"/>
                    <el-input class="input" v-model="userInfo.email"></el-input>
                </div>
            </div>

            <AddressSelect ref="address"></AddressSelect>

            <el-button @click="save" class="btn darken-blue" style="width: 50%; margin: 10px 25%">Create</el-button>
        </div>

    </div>
</template>

<script>
    import UserApi from "../../api/UserApi";
    import Pages from "../../router/Pages";

    export default {
        name: "Register",
        data() {
            return {
                domain: process.env.VUE_APP_BACKEND_URL,
                edit: true,
                userInfo: {
                    username: "",
                    password: "",
                    name: "",
                    gender: "MALE",
                    phone: "",
                    email: "",
                    dob: "",
                },
                loading: false
            }
        },
        methods: {
            save() {
                let entity = {
                    username: this.userInfo.username,
                    password: this.userInfo.password,
                    name: this.userInfo.name,
                    dob: this.userInfo.dob,
                    gender: this.userInfo.gender,
                    address: this.$refs.address.getAddress(),
                    phone: this.userInfo.phone,
                    email: this.userInfo.email,
                }

                this.loading = true;
                UserApi.register(entity).then(() => {
                    this.loading = false;
                    this.$services.alert.success("Create account success");
                    setTimeout(() => {
                        this.$router.push(Pages.login.path)
                    }, 1000)
                }).catch(() => {
                    this.loading = false;
                })
            },
            getUrl(url) {
                return this.$utils.buildFileUrl(url);
            },
            uploadSuccess(url) {
                this.userInfo.avatar = url;
                this.$refs.uploader.uploadFiles = [];
            },
        },
        mounted() {
            this.$refs.address.load();
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/var";

    .user-info-wrapper {
        background-color: $color-lightest-blue;
        height: 100%;
        overflow: auto;
    }

    .info {
        width: 800px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #cecece;
        background-color: white;
        border-radius: 10px;

        .input {
            width: calc(100% - 145px);
        }

        /deep/ .label {
            width: 145px !important;
        }

        /deep/ .field {
            width: calc(100% - 145px) !important;
        }
    }
</style>