<template>
    <div v-if="visible" v-loading="loading">
        <div v-show="!isOpenDepartment">
            <InputLabel style='width: auto' text="Hospital name" :required="true"/>
            <el-input v-model="name"></el-input>

            <InputLabel style='width: auto' text="Status" :required="true"/>
            <el-select v-model="status">
                <el-option label="Available   - Can find and can interact" value="AVAILABLE"/>
                <el-option label="Unavailable - Can find but can not interact" value="UNAVAILABLE"/>
                <el-option label="Hidden      - Can not be found" value="HIDDEN"/>
            </el-select>

            <InputLabel style='width: auto' text="Description" :required="true"/>
            <el-input v-model="description"></el-input>
            <el-button @click="save">Save</el-button>

            <div v-show="!isCreate">
                <div>
                    <p>Managers</p>
                    <div v-for="manager in managers">
                        {{manager.name}}
                    </div>
                    <div class="addManager">Add</div>
                </div>

                <div>
                    <p>Images</p>
                    <ImageGallery ref="imageGallery" @uploaded="saveFile"/>
                </div>
                <div>
                    <p>Department</p>
                    <DataTable :getTableDataFn="getDepartments" ref="table">
                        <el-table-column prop="name" label="Department Name">
                            <template slot-scope="scope">
                                {{scope.row.name}}
                                <el-button @click="selectDepartment(scope.row)">Detail</el-button>
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
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
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

    export default {
        name: "Hospital",
        components: {ImageGallery, Department},
        data() {
            return {
                isCreate: true,
                isOpenDepartment: false,
                loading: false,
                visible: false,
                id: -1,
                name: "",
                latitude: 0,
                longitude: 0,
                status: "HIDDEN",
                description: "",
                address: {
                    country: "Blank",
                    city: "Blank",
                    district: "Blank",
                    block: "Blank",
                    countryId: -1,
                    cityId: -1,
                    districtId: -1,
                    blockId: -1,
                    specificAddress: "Blank"
                },
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
                let entity = {
                    name: this.name,
                    latitude: this.latitude,
                    longitude: this.longitude,
                    status: this.status,
                    description: this.description,
                    addressId: this.address,
                }
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
                this.latitude = 0;
                this.longitude = 0;
                this.status = "HIDDEN";
                this.description = "";
                this.address = {
                    country: "Blank",
                    city: "Blank",
                    district: "Blank",
                    block: "Blank",
                    countryId: 1,
                    cityId: 1,
                    districtId: 1,
                    blockId: 1,
                    specificAddress: "Blank"
                }
                this.managers = [];
            },
            loadHospital({id, name, status, location, description, address, managers}) {
                this.isCreate = false;
                this.visible = true;
                this.id = id;
                this.name = name;
                this.latitude = location.latitude;
                this.longitude = location.longitude;
                this.status = status;
                this.description = description;
                this.managers = managers;
                this.address = address;

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
            }
        }
    }
</script>

<style scoped>

</style>