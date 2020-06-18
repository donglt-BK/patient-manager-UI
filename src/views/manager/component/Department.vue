<template>
    <div v-show="visible" v-loading="loading">
        <div class="info-wrapper clearfix">
            <div class="image-wrapper">
                <img class="image" :src="getUrl(image)"/>
                <el-upload ref="uploader" class="uploader" :action="domain + '/file/upload'"
                           :show-file-list="false" :on-success="uploadImageSuccess">
                    <el-button class="btn darken-blue" style="margin-top: 10px">Change</el-button>
                </el-upload>
            </div>
            <div style="float: right; width: calc(100% - 180px); display: inline-block">
                <InputLabel class="label" style='width: auto' text="Department name" :required="true"/>
                <el-input class="field" v-model="name"></el-input>

                <InputLabel class="label" text="Status" :required="true"/>
                <el-select class="field" v-model="status">
                    <el-option label="Available - Can find and can interact" value="AVAILABLE"/>
                    <el-option label="Unavailable - Can find but can not interact" value="UNAVAILABLE"/>
                    <el-option label="Hidden - Can not be found" value="HIDDEN"/>
                </el-select>

                <InputLabel class="label" text="Description" :optional="true"/>
                <el-input class="field" v-model="description"></el-input>
                <div class="manager-wrapper" v-show="!isCreate">
                    <p>Managers</p>
                    <ManagerList :managers="managers" @removeManager="removeManager" @addManager="addManager"/>
                </div>

                <el-button @click="save" class="save btn darken-blue">Save</el-button>
                <el-button @click="onDelete" v-show="!isCreate" class="delete-btn btn red">Delete Department</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import ManagerApi from "../../../api/ManagerApi";
    import ManagerList from "./ManagerList";
    import AddUserDialog from "./AddUserDialog";

    export default {
        name: "Department",
        components: {AddUserDialog, ManagerList},
        data() {
            return {
                domain: process.env.VUE_APP_BACKEND_URL,
                isCreate: true,
                loading: false,
                visible: false,
                id: -1,
                hospitalName: "",
                hospitalId: -1,
                name: "",
                status: "HIDDEN",
                description: "",
                managers: [],
                image: ''
            }
        },
        methods: {
            uploadImageSuccess(url) {
                this.image = url;
                this.$refs.uploader.uploadFiles = [];
                if (this.id !== -1) this.save();
            },
            save() {
                let entity = {
                    hospitalId: this.hospitalId,
                    name: this.name,
                    status: this.status,
                    description: this.description,
                    image: this.image
                }
                if (this.id === -1) {
                    this.loading = true;
                    ManagerApi.addDepartment(entity).then(response => {
                        this.loading = false;
                        this.$emit("updateSuccess", this.name);
                        this.$services.alert.success("Create department success");
                        this.loadDepartment(response);
                    });
                } else {
                    entity.id = this.id;
                    this.loading = true;
                    ManagerApi.updateDepartment(entity).then(() => {
                        this.loading = false;
                        this.$emit("updateSuccess", this.name);
                        this.$services.alert.success("Update department success");
                    });
                }
            },
            createDepartment({name, id}) {
                this.isCreate = true;
                this.visible = true;
                this.id = -1;
                this.hospitalId = id;
                this.hospitalName = name;
                this.name = "";
                this.status = "HIDDEN";
                this.description = "";
                this.managers = [];
                this.image = '';
            },
            loadDepartment({id, hospitalId, hospitalName, name, status, description, managers, image}) {
                this.isCreate = false;
                this.visible = true;
                this.id = id;
                this.hospitalId = hospitalId;
                this.hospitalName = hospitalName;
                this.name = name;
                this.status = status;
                this.description = description;
                this.managers = managers;
                this.image = image;
            },
            onDelete() {
                this.$emit("delete", this.id);
            },
            close() {
                this.visible = false;
            },
            getUrl(file) {
                return this.$utils.buildFileUrl(file);
            },
            addManager(managerId) {
                ManagerApi.addDepartmentManager({
                    departmentId: this.id,
                    managerId: managerId
                }).then(response => {
                    this.managers.push(response);
                    this.$services.alert.success("Add manager successful");
                    this.$emit("updateSuccess")
                })
            },
            removeManager(managerId) {
                this.$services.deleteDialog.open(
                    () => {
                        ManagerApi.removeDepartmentManager({
                            departmentId: this.id,
                            managerId: managerId
                        }).then(() => {
                            this.managers = this.managers.filter(manager => manager.id !== managerId);
                            this.$services.alert.success("Remove manager successful");
                            this.$emit("updateSuccess")
                        })
                    }, {
                        title: "Remove Manager",
                        msg: "Do you want to remove this person from department managers?",
                        ok: "Confirm",
                        cancel: "Cancel",
                    });
            }
        }
    }
</script>

<style scoped lang="scss">
    .image-wrapper {
        display: inline-block;
        float: left;
        width: 180px;
        height: 200px;
        padding-right: 10px;
        text-align: center;
    }

    .image {
        overflow: hidden;
        width: 100%;
        border-radius: 10px;
        border: 3px solid #d2d2d2;
    }

    .delete-btn {
        margin-top: 4px !important;
    }

    .label {
        margin-top: 10px;
        width: 200px !important;
    }

    .field {
        width: calc(100% - 200px);
    }

    hr {
        margin: 20px;
    }

    .info-wrapper {
        margin-top: 10px;

        .save {
            margin-top: 4px;
            width: 75px;
            float: right;
        }

        .manager-wrapper {
            width: calc(100% - 265px);
            float: left;
            margin: 5px 10px 0 0;
            height: 38px;
            border-radius: 10px;
            position: relative;

            > p {
                width: 75px;
                margin: 8px 0;
                display: inline-block;
            }

            > div {
                width: calc(100% - 75px);
                display: inline-block;
                position: absolute;
                left: 90px;
            }
        }
    }
</style>