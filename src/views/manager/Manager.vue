<template>
    <div>
        <Breadcrumb ref="breadcrumb" @returnManagement="toManagement" @returnHospital="toHospital"/>
        <div v-show="!isOpenHospital">
            <DataTable :getTableDataFn="getHospitals">
                <el-table-column prop="name" label="Hospital Name">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                        <el-button @click="selectHospital(scope.row)">Detail</el-button>
                    </template>
                </el-table-column>
            </DataTable>
            <div class="add" @click="addHospital">Add</div>
        </div>
        <Hospital @selectDepartment="selectDepartment" @addDepartment="addDepartment" ref="hospital"></Hospital>
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
            }
        }
    }
</script>

<style scoped>

</style>