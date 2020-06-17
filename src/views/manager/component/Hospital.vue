<template>
    <div v-show="visible" v-loading="loading">
        <div v-show="!isOpenDepartment">
            <div class="info-wrapper clearfix">
                <div>
                    <InputLabel class='label' text="Hospital name" :required="true"/>
                    <el-input class='field' v-model="name"></el-input>

                    <InputLabel class='label' text="Status" :required="true"/>
                    <el-select class='field' v-model="status">
                        <el-option label="Available   - Can find and can interact" value="AVAILABLE"/>
                        <el-option label="Unavailable - Can find but can not interact" value="UNAVAILABLE"/>
                        <el-option label="Hidden      - Can not be found" value="HIDDEN"/>
                    </el-select>

                    <InputLabel class='label' text="Description" :optional="true"/>
                    <el-input class='field' v-model="description"></el-input>

                    <AddressSelect ref="address"></AddressSelect>

                    <div v-show="!isCreate" class="manager-wrapper">
                        <p  >Managers</p>
                        <ManagerList :managers="managers" @removeManager="removeManager" @addManager="addManager"/>
                    </div>

                    <el-button @click="save" class="save blue">Save</el-button>
                </div>
                <div class="map-wrapper">
                    <GoogleMap ref="map" :maker-name="name"/>
                </div>
            </div>
            <hr/>

            <div v-show="!isCreate">
                <div>
                    <p>Images</p>
                    <ImageGallery ref="imageGallery" @uploaded="saveFile" @remove="removeFile"/>
                </div>
                <hr/>
                <div>
                    <p>Department</p>
                    <DataTable :getTableDataFn="getDepartments" ref="table">
                        <el-table-column prop="name" label="Department Name">
                            <template slot-scope="scope">
                                {{scope.row.name}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="Status">
                            <template slot-scope="scope">
                                <el-button @click="changeStatus(scope.row, 'AVAILABLE')" class="available status"
                                           v-bind:class="{active: scope.row.status === 'AVAILABLE'}">
                                    Available
                                </el-button>
                                <el-button @click="changeStatus(scope.row, 'UNAVAILABLE')" class="unavailable status"
                                           v-bind:class="{active: scope.row.status === 'UNAVAILABLE'}">
                                    Unavailable
                                </el-button>
                                <el-button @click="changeStatus(scope.row, 'HIDDEN')" class="cant-see status"
                                           v-bind:class="{active: scope.row.status === 'HIDDEN'}">
                                    Hidden
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <el-button @click="selectDepartment(scope.row)">Detail</el-button>
                                <el-button @click="deleteDepartment(scope.row.id)">Delete</el-button>
                            </template>
                        </el-table-column>
                    </DataTable>
                    <div class="add" @click="addDepartment">Add</div>
                </div>

                <el-button @click="onDelete">Delete</el-button>
            </div>
        </div>

        <Department ref="department" @updateSuccess="updateSuccess" @delete="deleteDepartment"/>
    </div>
</template>

<script>
    import Department from "./Department";
    import ManagerApi from "../../../api/ManagerApi";
    import FileApi from "../../../api/FileApi";
    import ImageGallery from "./ImageGallery";
    import ManagerList from "./ManagerList";

    export default {
        name: "Hospital",
        components: {ManagerList, ImageGallery, Department},
        data() {
            return {
                isCreate: true,
                isOpenDepartment: false,
                loading: false,
                visible: false,
                id: -1,
                name: "",
                status: "HIDDEN",
                description: "",
                managers: [],
            }
        },
        methods: {
            async getDepartments(pageRequest) {
                if (this.id === -1) return;
                return ManagerApi.listDepartment({
                    hospitalId: this.id,
                    ...pageRequest
                });
            },
            save() {
                let {lat, lng} = this.$refs.map.getLocation();
                //let {lat, lng} = {lat: 21.004807, lng: 105.845115};
                let entity = {
                    name: this.name,
                    latitude: lat,
                    longitude: lng,
                    status: this.status,
                    description: this.description,
                    addressId: this.$refs.address.getAddress(),
                }
                console.log(entity)
                if (this.id === -1) {
                    this.loading = true;
                    ManagerApi.addHospital(entity).then(response => {
                        this.loading = false;
                        this.$emit("updateSuccess");
                        this.$services.alert.success("Create hospital success");
                        this.loadHospital(response);
                    });
                } else {
                    entity.id = this.id;
                    this.loading = true;
                    ManagerApi.updateHospital(entity).then(() => {
                        this.loading = false;
                        this.$emit("updateSuccess");
                        this.$services.alert.success("Update hospital success");
                    });
                }
            },
            createHospital() {
                this.isCreate = true;
                this.visible = true;
                this.id = -1;
                this.name = "";
                this.status = "HIDDEN";
                this.description = "";
                this.$refs.address.reset();
                this.managers = [];

                this.$refs.map.load();
            },
            loadHospital({id, name, status, location, description, address, managers}) {
                this.isCreate = false;
                this.visible = true;
                this.id = id;
                this.name = name;
                this.status = status;
                this.description = description;
                this.managers = managers;
                this.$refs.table.reload();

                this.$refs.map.load(location.latitude, location.longitude);
                this.$refs.address.load(address);

                FileApi.getHospitalFiles(id).then(response => {
                    let images = [];
                    if (response !== "")
                        images = (response + "").split("||");
                    this.$refs.imageGallery.loadImage(images)
                })
            },
            addDepartment() {
                this.isOpenDepartment = true;
                this.$refs.department.createDepartment(this);
                this.$emit("addDepartment");
            },
            selectDepartment(department) {
                this.isOpenDepartment = true;
                this.$refs.department.loadDepartment(department);
                this.$emit("selectDepartment", department);
            },
            close() {
                this.closeDepartment();
                this.visible = false;
            },
            closeDepartment() {
                this.isOpenDepartment = false;
                this.$refs.department.close();
            },
            updateSuccess() {
                this.$refs.table.reload();
            },
            changeStatus(department, status) {
                if (department.status !== status) {
                    department.status = status;
                    ManagerApi.updateDepartment({
                        id: department.id,
                        status: status
                    }).then(() => {
                        this.$services.alert.success("Department status changed to " + status, 1000)
                    })
                }
            },
            saveFile(file) {
                FileApi.addHospitalFile(this.id, file);
            },
            removeFile(file) {
                FileApi.deleteHospitalFile(this.id, file);
            },
            onDelete() {
                this.$emit("delete", this.id);
            },
            deleteDepartment(departmentId) {
                this.$services.deleteDialog.open(
                    () => {
                        this.confirmDeleteDepartment(departmentId)
                    }, {
                        title: "Delete Department",
                        msg: "Do you want to delete this department? This can not be undone",
                        ok: "Confirm",
                        cancel: "Cancel",
                    });
            },
            confirmDeleteDepartment(departmentId) {
                this.loading = true;
                this.closeDepartment();
                ManagerApi.deleteDepartment(this.id, departmentId).then(() => {
                    this.loading = false;
                    this.$refs.table.reload();
                    this.$emit("deleteDepartment");
                    this.$services.alert.success("Delete department successful");
                    this.$services.scrollTop();
                })
            },
            addManager(managerId) {
                ManagerApi.addHospitalManager({
                    hospitalId: this.id,
                    managerId: managerId
                }).then(response => {
                    this.managers.push(response);
                    this.$services.alert.success("Add manager successful");
                    this.$emit("updateSuccess")
                })
            },
            removeManager(managerId) {
                console.log(managerId);
                this.$services.deleteDialog.open(
                    () => {
                        ManagerApi.removeHospitalManager({
                            hospitalId: this.id,
                            managerId: managerId
                        }).then(() => {
                            this.managers = this.managers.filter(manager => manager.id !== managerId);
                            this.$services.alert.success("Remove manager successful");
                            this.$emit("updateSuccess")
                        })
                    }, {
                        title: "Remove Manager",
                        msg: "Do you want to remove this person from hospital managers?",
                        ok: "Confirm",
                        cancel: "Cancel",
                    });
            }
        }
    }
</script>

<style scoped lang="scss">
    .label {
        margin-top: 10px;
        width: 160px !important;
    }

    .field {
        width: calc(100% - 160px);
    }

    hr {
        margin: 20px;
    }
    .info-wrapper {
        margin-top: 10px;

        > div {
            display: inline-block;
            float: left;
            width: calc(100% - 310px);
        }

        .map-wrapper {
            width: 300px;
            height: 300px;
            margin-left: 10px;
        }

        .save {
            margin-top: 12px;
            width: 75px;
            float: right;
            background-color: blue;
            color: white;
        }

        .manager-wrapper {
            width: calc(100% - 95px);
            float: left;
            margin: 14px 10px 0 0;
            height: 38px;
            border-radius: 10px ;
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