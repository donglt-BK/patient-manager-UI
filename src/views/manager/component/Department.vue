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
        <el-button>Save</el-button>

        <div v-loading="images === 'loading'">
            <img v-if="images !== 'loading'" v-for="img in images" :src="img">
            <AttachmentsUploader></AttachmentsUploader>
        </div>

        <DataTable :getTableDataFn="getDoctors">
            <el-table-column prop="name" label="Doctor">
                <template slot-scope="scope">
                    {{scope.row.name}}
                    <el-button @click="selectDoctor(scope.row)">Detail</el-button>
                </template>
            </el-table-column>
        </DataTable>
        <div class="add" @click="addDoctor">Add</div>
    </div>
</template>

<script>
    import ManagerApi from "../../../api/ManagerApi";
    import FileApi from "../../../api/FileApi";
    import Util from "../../../util";

    export default {
        name: "Department",
        data() {
            return {
                loading: false,
                visible: false,
                id: -1,
                hospitalName: "",
                hospitalId: -1,
                name: "",
                status: "HIDDEN",
                description: "",
                images: [],
                managers: [],
            }
        },
        methods: {
            async getDoctors(pageRequest) {
                return ManagerApi.listDoctor({
                    departmentId: this.id,
                    ...pageRequest
                });
            },
            createDepartment({name, id}) {
                this.visible = true;
                this.id = -1;
                this.hospitalId = id;
                this.hospitalName = name;
                this.name = "";
                this.status = "HIDDEN";
                this.description = "";
                this.images = [];
                this.managers = [];
            },
            loadDepartment({id, hospitalId, hospitalName, name, status, description, managers}) {
                this.visible = true;
                this.id = id;
                this.hospitalId = hospitalId;
                this.hospitalName = hospitalName;
                this.name = name;
                this.status = status;
                this.description = description;
                this.managers = managers;

                this.images = "loading";
                FileApi.getDepartmentFiles(id).then(response => {
                    console.log(typeof(response));
                    if (response === null) this.images = [];
                    else this.images = (response + "").split("||").map(url => Util.buildFileUrl(url));
                })
            },
            selectDoctor() {

            },
            addDoctor() {

            },
            close() {
                this.visible = false;
            },
        }
    }
</script>

<style scoped>

</style>