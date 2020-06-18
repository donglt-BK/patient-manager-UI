<template>
    <el-dialog :visible.sync="visible" width="70%">
        <div class="img-wrapper" slot="title" @click="changeImage">
            <div v-for="(url, i) in hospital.files">
                <img :src="getHospitalImage(url)" :class="{active: i === display}">
            </div>
        </div>
        <div class="clearfix">
            <div class="info">
                <p class="name">{{hospital.name}}</p>
                <p class="address">{{getAddress()}}</p>
                <hr>
                <p class="description">{{hospital.description}}</p>
            </div>
            <div class="map-wrapper">
                <GoogleMap ref="map" :maker-name="hospital.name" :movable="false" :show-my-location="true"/>
            </div>
        </div>
        <hr style="margin: 13px 0">
        <div class="clearfix department-wrapper">
            <p style="font-size: 20px; font-weight: bold; margin-bottom: 5px">Departments</p>
            <div v-for="t in [0,1,2]" class="column">
                <DepartmentBox v-for="(d, i) in departments" v-if="i % 3 === t" :data="d">
                </DepartmentBox>
            </div>
            <div style="text-align: center" v-if="departments.length === 0">No department found</div>
        </div>
        <div>

        </div>
    </el-dialog>
</template>

<script>
    import AppointmentApi from "../../../api/AppointmentApi";
    import DepartmentBox from "./DepartmentBox";

    export default {
        name: "HospitalDialog",
        components: {DepartmentBox},
        data() {
            return {
                visible: false,
                hospital: {},
                display: 0,
                departments: [],
                loading: false,
                page: 1,
                size: 10
            }
        },
        methods: {
            getAddress() {
                let addressStr = '';
                const address = this.hospital.address;
                if (address) {
                    const specificAddress = address.specificAddress;
                    if (this.isAddress(specificAddress)) {
                        addressStr += specificAddress + ' - ';
                    }
                    addressStr += address.block + ", " + address.district + ", " + address.city + ", " + address.country;
                }
                return addressStr;
            },
            isAddress(s) {
                return s && s !== '' && s !== 'Blank'
            },
            show(h) {
                this.loading = true;
                this.page = 1;
                AppointmentApi.findDepartment({hospitalId: h.id})
                    .then(res => this.departments = res);
                this.visible = true;
                this.display = 0;
                this.hospital = h;
                setTimeout(() => {
                    this.$refs.map.load(this.hospital.location.latitude, this.hospital.location.longitude);
                }, 100)
            },
            getHospitalImage(url) {
                return this.$utils.buildFileUrl(url);
            },
            changeImage() {
                const hospital = this.hospital;
                if (hospital.files && hospital.files.length > 1) {
                    this.display++;
                    if (this.display === hospital.files.length) this.display = 0;
                }
            }
        },
        mounted() {
            setInterval(this.changeImage, 7000)
        }
    }
</script>

<style scoped lang="scss">
    /deep/ .el-dialog__header {
        padding: 0;
    }

    .map-wrapper {
        width: 300px;
        height: 300px;
        float: right;
    }

    .info {
        width: calc(100% - 300px);
        float: left;
        padding-right: 10px;
    }

    .name {
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 0;
    }

    .address {
        margin-top: 2px;
        font-size: 13px;
    }


    .img-wrapper {
        cursor: pointer;
        width: 100%;
        height: 200px;
        overflow: hidden;
        border-bottom: 1px solid #e0e0e0;
        position: relative;

        div {
            height: 100%;
            width: 100%;
            position: absolute;
            text-align: center;
            line-height: 200px;

            img {
                max-height: 100%;
                max-width: 100%;
                vertical-align: middle;
                transition: opacity 1s;
                opacity: 0;

                &.active {
                    opacity: 1;
                }
            }
        }
    }

    .department-wrapper {
        .column {
            width: calc(100% / 3 - 20px);
            margin: 10px;
            float: left;
        }
    }
</style>