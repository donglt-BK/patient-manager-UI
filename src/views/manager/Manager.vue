<template>
    <div>
        <Breadcrumb ref="breadcrumb" @returnManagement="toManagement" @returnHospital="toHospital"/>
        <div v-show="!isOpenHospital">
            <DataTable :getTableDataFn="getHospitals" ref="table">
                <el-table-column prop="name" label="Hospital Name">
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
                        <el-button @click="selectHospital(scope.row)">Detail</el-button>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button @click="deleteHospital(scope.row.id)">Delete</el-button>
                    </template>
                </el-table-column>
            </DataTable>
            <div class="add" @click="addHospital">Add</div>
        </div>
        <Hospital @selectDepartment="selectDepartment" @addDepartment="addDepartment"
                  @updateSuccess="updateSuccess" @deleteDepartment="returnHospital"
                  @delete="deleteHospital"
                  ref="hospital"></Hospital>
    </div>
</template>

<script>
    import Breadcrumb from "./component/Breadcrumb";
    import Hospital from "./component/Hospital";
    import ManagerApi from "../../api/ManagerApi";

    export default {
        name: "Manager",
        components: {Hospital, Breadcrumb},
        data() {
            return {
                isOpenHospital: false,
                level: "management"
            }
        },
        mounted() {
        },
        methods: {
            async getHospitals(pageRequest) {
                return ManagerApi.listHospital(pageRequest);
            },
            addHospital() {
                this.isOpenHospital = true;
                this.$refs.hospital.createHospital();
                this.$refs.breadcrumb.goToHospital("Add hospital");
            },
            addDepartment() {
                this.$refs.breadcrumb.goToDepartment("Add department");
            },
            toManagement() {
                this.isOpenHospital = false;
                this.$refs.hospital.close();
            },
            toHospital() {
                this.$refs.hospital.closeDepartment();
            },
            selectHospital(hospital) {
                this.isOpenHospital = true;
                this.$refs.hospital.loadHospital(hospital);
                this.$refs.breadcrumb.goToHospital(hospital.name);
            },
            selectDepartment(department) {
                this.$refs.breadcrumb.goToDepartment(department.name);
            },
            updateSuccess() {
                this.$refs.table.reload();
            },
            changeStatus(hospital, status) {
                if (hospital.status !== status) {
                    hospital.status = status;
                    ManagerApi.updateHospital({
                        id: hospital.id,
                        status: status
                    }).then(() => {
                        this.$services.alert.success("Hospital status changed to " + status, 10000)
                    })
                }
            },
            returnHospital() {
                this.$refs.breadcrumb.returnHospital();
            },
            deleteHospital(hospitalId) {
                this.$services.deleteDialog.open(
                    () => {
                        this.confirmDeleteHospital(hospitalId)
                    }, {
                        title: "Delete Hospital",
                        msg: "Do you want to delete this hospital? This can not be undone",
                        ok: "Confirm",
                        cancel: "Cancel",
                    });
            },
            confirmDeleteHospital(hospitalId) {
                this.loading = true;
                this.toManagement();
                ManagerApi.deleteHospital(hospitalId).then(() => {
                    this.loading = false;
                    this.$refs.table.reload();
                    this.$refs.breadcrumb.returnManagement();
                    this.$services.alert.success("Delete hospital successful");
                    this.$services.scrollTop();
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    /deep/ .status.active {
        color: white;

        &.available {
            background: blue;
        }

        &.unavailable {
            background: red;
        }

        &.cant-see {
            background: black;
        }
    }
</style>