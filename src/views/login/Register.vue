<template>
    <div class="user-info-wrapper" v-loading="loading">
        <InputLabel style='width: auto' text="Username" :required="true"/>
        <el-input v-model="userInfo.username"></el-input>

        <InputLabel style='width: auto' text="Password" :required="true"/>
        <el-input type="password" v-model="userInfo.password"></el-input>

        <InputLabel style='width: auto' text="Name" :required="true"/>
        <el-input v-model="userInfo.name"></el-input>

        <InputLabel style='width: auto' text="Gender" :required="true"/>
        <el-select v-model="userInfo.gender">
            <el-option label="Male" value="MALE"/>
            <el-option label="Female" value="FEMALE"/>
        </el-select>

        <InputLabel style='width: auto' text="Date of Birth" :required="true"/>
        <el-date-picker v-model="userInfo.dob"></el-date-picker>

        <InputLabel style='width: auto' text="Phone" :optional="true"/>
        <el-input v-model="userInfo.phone"></el-input>

        <InputLabel style='width: auto' text="Email" :optional="true"/>
        <el-input v-model="userInfo.email"></el-input>

        <AddressSelect ref="address"></AddressSelect>
        <el-button @click="save">Save</el-button>
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
                    loading: false
                },
            }
        },
        methods: {
            save() {
                let entity = {
                    name: this.userInfo.name,
                    avatar: this.userInfo.avatar,
                    dob: this.userInfo.dob,
                    gender: this.userInfo.gender,
                    address: this.$refs.address.getAddress(),
                    phone: this.userInfo.phone,
                    email: this.userInfo.email,
                }

                this.loading = true;
                UserApi.register(entity).then(() => {
                    this.loading = false;
                    this.$services.alert.success("Update success");
                    setTimeout(() => {
                        this.$router.push(Pages.login.path)
                    }, 1000)
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
    .avatar {
        overflow: hidden;
        width: 100px;
        height: 100px;
        border-radius: 10px;
        border: 3px solid #d2d2d2;

        img {
            width: 100%;
        }
    }
</style>