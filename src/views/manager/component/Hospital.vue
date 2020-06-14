<template>
    <div v-if="visible" v-loading="loading">
        <div v-show="!isOpenDepartment">
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
            <el-button>Save</el-button>

            <div>
                <div v-for="manager in managers">
                    {{manager.name}}
                </div>
                <div class="addManager"></div>
            </div>

            <div v-loading="images === 'loading'">
                <img v-if="images !== 'loading'" v-for="img in images" :src="img">
                <AttachmentsUploader></AttachmentsUploader>
            </div>

            <DataTable :getTableDataFn="getDepartments">
                <el-table-column prop="name" label="Department Name">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                        <el-button @click="selectDepartment(scope.row)">Detail</el-button>
                    </template>
                </el-table-column>
            </DataTable>
            <div class="add" @click="addDepartment">Add</div>
        </div>

        <Department ref="department"/>
    </div>
</template>

<script>
    import Department from "./Department";
    import ManagerApi from "../../../api/ManagerApi";
    import FileApi from "../../../api/FileApi";

    export default {
        name: "Hospital",
        components: {Department},
        data() {
            return {
                isOpenDepartment: false,
                loading: false,
                visible: false,
                id: -1,
                name: "",
                location: {
                    latitude: 0,
                    longitude: 0
                },
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
                images: [],
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
            createHospital() {
                this.visible = true;
                this.id = -1;
                this.name = "";
                this.location.latitude = 0;
                this.location.longitude = 0;
                this.status = "HIDDEN";
                this.description = "";
                this.address = {
                    country: "Blank",
                    city: "Blank",
                    district: "Blank",
                    block: "Blank",
                    countryId: -1,
                    cityId: -1,
                    districtId: -1,
                    blockId: -1,
                    specificAddress: "Blank"
                }
                this.images = [];
                this.managers = [];
            },
            loadHospital({id, name, status, location, description, address, managers}) {
                this.visible = true;
                this.id = id;
                this.name = name;
                this.status = status;
                this.description = description;
                this.managers = managers;

                this.images = "loading";
                FileApi.getHospitalFiles(id).then(response => {
                    console.log(response);
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
                this.$refs.department.close();
                this.visible = false;
            },
            closeDepartment() {
                this.isOpenDepartment = false;
                this.$refs.department.close();
            }
        }
    }
</script>

<style scoped>

</style>