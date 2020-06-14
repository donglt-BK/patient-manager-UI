<template>
    <div v-if="visible" v-loading="loading">
        <InputLabel style='width: auto' text="Hospital" :required="true"/>
        <el-input :disabled="true" v-model="hospitalName"></el-input>

        <InputLabel style='width: auto' text="Department name" :required="true"/>
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
                <p>Images</p>
                <ImageGallery ref="imageGallery" @uploaded="saveFile"/>
            </div>
            <div>
                <DataTable :getTableDataFn="getDoctors" ref="table">
                    <el-table-column prop="name" label="Doctor">
                        <template slot-scope="scope">
                            {{scope.row.name}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="licenceUrl">
                        <template slot-scope="scope">
                            <img v-if="scope.row.licenceUrl" :src="getUrl(scope.row.licenceUrl)">
                            <p v-else>No licence upload</p>
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
                            <el-button @click="deleteDoctor(scope.row.id)">Delete</el-button>
                        </template>
                    </el-table-column>
                </DataTable>
                <div class="add" @click="addDoctor">Add</div>
            </div>

            <el-button @click="onDelete">Delete</el-button>
        </div>
    </div>
</template>

<script>
    import ManagerApi from "../../../api/ManagerApi";
    import FileApi from "../../../api/FileApi";
    import Util from "../../../util";
    import ImageGallery from "./ImageGallery";

    export default {
        name: "Department",
        components: {ImageGallery},
        data() {
            return {
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
            }
        },
        methods: {
            async getDoctors(pageRequest) {
                if (this.id === -1) return;
                return ManagerApi.listDoctor({
                    departmentId: this.id,
                    ...pageRequest
                });
            },
            save() {
                let entity = {
                    hospitalId: this.hospitalId,
                    name: this.name,
                    status: this.status,
                    description: this.description,
                }
                if (this.id === -1) {
                    this.loading = true;
                    ManagerApi.addDepartment(entity).then(response => {
                        this.loading = false;
                        console.log(response)
                        this.$emit("updateSuccess");
                        this.$services.alert.success("Create department success");
                        this.loadDepartment(response);
                    });
                } else {
                    entity.id = this.id;
                    this.loading = true;
                    ManagerApi.updateDepartment(entity).then(response => {
                        this.loading = false;
                        this.$emit("updateSuccess");
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
            },
            loadDepartment({id, hospitalId, hospitalName, name, status, description, managers}) {
                this.isCreate = false;
                this.visible = true;
                this.id = id;
                this.hospitalId = hospitalId;
                this.hospitalName = hospitalName;
                this.name = name;
                this.status = status;
                this.description = description;
                this.managers = managers;

                FileApi.getDepartmentFiles(id).then(response => {
                    let images = [];
                    if (response !== "")
                        images = (response + "").split("||");
                    this.$refs.imageGallery.loadImage(images)
                })
            },
            addDoctor() {

            },
            onDelete() {
                this.$emit("delete", this.id);
            },
            close() {
                this.visible = false;
            },
            changeStatus(doctor, status) {
                if (doctor.status !== status) {
                    doctor.status = status;
                    ManagerApi.updateDoctor({
                        id: doctor.id,
                        status: status
                    }).then(() => {
                        this.$services.alert.success("Doctor status changed to " + status, 1000)
                    })
                }
            },
            saveFile(file) {
                FileApi.addHospitalFile(this.id, file);
            },
            getUrl(file) {
                Util.buildFileUrl(file);
            },
            deleteDoctor(doctorId) {
                this.$services.deleteDialog.open(
                    () => {
                        this.confirmDeleteDoctor(doctorId)
                    }, {
                        title: "Delete Doctor",
                        msg: "Do you want to delete this doctor? This can not be undone",
                        ok: "Confirm",
                        cancel: "Cancel",
                    });
            },
            confirmDeleteDoctor(doctorId) {
                this.loading = true;
                ManagerApi.deleteDoctor(this.id, doctorId).then(() => {
                    this.loading = false;
                    this.$refs.table.reload();
                    this.$services.alert.success("Delete doctor successful");
                })
            }
        }
    }
</script>

<style scoped>

</style>