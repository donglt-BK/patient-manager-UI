<template>
    <el-dialog v-loading="loading" :visible.sync="visible" width="450px">
        <div slot="title" class="text-center bold" style="font-size: 18px">Confirm Appointment</div>
        <div class="info">
            <div class="label">
                <p>Hospital:</p>
                <p>Department:</p>
                <p>Date:</p>
                <p>Shift:</p>
                <p>Estimate position:</p>
            </div>
            <div class="text">
                <p>{{hospital}}</p>
                <p>{{department}}</p>
                <p>{{date}}</p>
                <p>{{shift}}</p>
                <p>{{pos || pos === 0 ? pos + 1 : 'Unknown'}}</p>
            </div>

        </div>
        <div class="text-center">
            <el-button class="darken-blue btn" @click="confirm">Confirm</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import AppointmentApi from "../../../api/AppointmentApi";
    import moment from 'moment';
    import Pages from "../../../router/Pages";

    export default {
        name: "ConfirmDialog",
        data() {
            return {
                loading: false,
                visible: false,
                date: '',
                shift: '',
                pos: 0,
                id: -1,
                hospital: '',
                department: ""
            }
        },
        methods: {
            show(schedule, hospital, department) {
                this.date = moment(schedule.date).format("YYYY-MM-DD");
                this.shift = schedule.shift;
                this.pos = schedule.pos;
                this.id = schedule.id;
                this.visible = true;
                this.hospital = hospital;
                this.department = department;
            },
            confirm() {
                this.loading = true;
                AppointmentApi.book(this.id).then(res => {
                    this.loading = false;
                    this.$services.alert.success("Create appointment success");
                    setTimeout(() => {
                        this.$router.push(Pages.appointment.path + "?id=" + res.id)
                    }, 1000)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .info {
        display: flex;
        font-size: 16px;

        .label {
            flex: 3;
            display: inline-block;
        }

        .text {
            flex: 5;
            display: inline-block;
        }
    }


    /deep/ .el-dialog__body {
        padding-top: 5px;
    }
</style>