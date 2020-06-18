<template>
    <div class="user-info-wrapper">
        <div class="edit">
            <div class="clearfix">
                <div class="avatar-wrapper">
                    <div class="avatar">
                        <img :src="getUrl(userInfo.avatar)"/>
                    </div>
                    <el-upload ref="uploader" class="uploader" :action="domain + '/file/upload'"
                               :show-file-list="false" :on-success="uploadSuccess">
                        <el-button class="btn darken-blue" style="margin-top: 10px; padding: 10px">Change</el-button>
                    </el-upload>
                </div>
                <div class="info">
                    <InputLabel style='width: 145px' text="Name" :required="true"/>
                    <el-input class="input" v-model="userInfo.name"></el-input>

                    <InputLabel style='width: 145px' text="Username" :required="true"/>
                    <el-input class="input" v-model="userInfo.username" disabled></el-input>

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
                </div>
            </div>
            <div style="text-align: right; margin-top: 10px">
                <el-button @click="save" class="btn darken-blue">Save</el-button>

            </div>
        </div>
    </div>
</template>

<script>
    import UserApi from "../../api/UserApi";

    export default {
        name: "Profile",
        data() {
            return {
                domain: process.env.VUE_APP_BACKEND_URL,
                edit: true,
                userInfo: this.$auth.getCurrentUser(),
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

                UserApi.update(entity).then(() => {
                    this.$services.alert.success("Update success");
                    this.$auth.getCurrentUser().update(entity);
                })
            },
            getUrl(url) {
                return this.$utils.buildFileUrl(url);
            },
            uploadSuccess(url) {
                this.userInfo.avatar = url;
                this.$refs.uploader.uploadFiles = [];
                this.save();
            },
        },
        mounted() {
            this.$refs.address.load(this.$auth.getCurrentUser().address);
        }
    }
</script>

<style scoped lang="scss">
    .avatar-wrapper {
        float: left;
        width: 100px;
        text-align: center;
    }

    .info {
        float: left;
        padding-left: 20px;
        width: calc(100% - 100px);
    }

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

    .user-info-wrapper {
        width: 800px;
        margin: auto;
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