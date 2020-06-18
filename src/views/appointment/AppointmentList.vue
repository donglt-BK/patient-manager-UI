<template>
    <div v-loading="loading" class="wrapper">
        <div class="checkbox-wrapper">
            <p style="text-align: center; font-size: 20px;">Your Appointment</p>
            <hr>
            <el-checkbox v-model="showHistory" @change="isNone">Show Old Appointment</el-checkbox>
            <el-checkbox v-model="showComing" @change="isNone">Show Incoming Appointment</el-checkbox>
            <el-checkbox v-model="showCancel" @change="isNone">Show Canceled Appointment</el-checkbox>
        </div>
        <div class="appointment-wrapper">
            <div v-for="a in appointments" v-if="isShow(a)" class="appointment clearfix">
                <div class="cancel" v-if="a.canceled">CANCEL</div>
                <div v-else class="pos">
                    <span style="font-size: 12px">POS</span><br>
                    <span style="font-size: 20px">{{a.pos}}</span>
                </div>

                <div class="info">
                    <p class="hospital">{{a.hospitalName}}</p>
                    <p class="department">{{a.departmentName}}</p>
                </div>
                <div class="time">
                    {{a.schedule.shift}}<br>{{a.date}}
                </div>
                <div class="cancel-btn" v-show="!isPast(a) && !a.canceled" @click="showConfirmCancel(a.id)">
                    <div/>
                </div>
            </div>
            <div v-if="none" style="text-align: center; padding: 20px">No appointment found</div>
        </div>
    </div>
</template>

<script>
    import moment from "moment";
    import ConfirmDialog from "./component/ConfirmDialog";
    import AppointmentApi from "../../api/AppointmentApi";

    export default {
        name: "AppointmentBook",
        components: {ConfirmDialog},
        data() {
            return {
                appointments: [],
                loading: false,
                showCancel: true,
                showHistory: true,
                showComing: true,
                none: true
            }
        },
        methods: {
            showConfirmCancel(id) {
                this.$services.deleteDialog.open(
                    () => {
                        this.loading = true;
                        AppointmentApi.cancel(id).then(this.getAppointments);
                    }, {
                        title: "Cancel Appointment",
                        msg: "Do you want to cancel this appointment? This can not be undone",
                        ok: "Confirm",
                        cancel: "Cancel",
                    });
            },
            isNone() {
                this.none = this.appointments.filter(this.isShow).length === 0;
            },
            async getAppointments() {
                this.loading = true;
                let response = await AppointmentApi.myAppointment();
                this.loading = false;
                response.forEach(a => {
                    a.date = moment(a).format("YYYY-MM-DD");
                })
                response.sort((a, b) => {
                    if (a.date !== b.date)
                        return a.date > b.date;

                    if (a.schedule.shift !== b.schedule.shift)
                        return a.schedule.shift > b.schedule.shift;

                    if (a.schedule.id !== b.schedule.id)
                        return a.schedule.id > b.schedule.id;

                    return a.id > b.id;
                });
                this.appointments = response;
                this.isNone();
            },
            isPast(a) {
                let today = moment().format('YYYY-MM-DD');
                if (today !== a.date) return a.date < today;
                if (a.schedule.shift === 'AFTERNOON') return true;
                return moment().format("HH") < '12';
            },
            isShow(a) {
                if (!this.showHistory && this.isPast(a)) return false;
                if (!this.showComing && !this.isPast(a)) return false;
                if (!this.showCancel && a.canceled) return false;
                return true;
            }
        },
        mounted() {
            this.getAppointments();
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/var";

    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: $color-darken-blue;
        border-color: $color-darken-blue;
    }

    /deep/ .el-checkbox__label {
        color: black !important;
        font-size: 15px;
    }

    .wrapper {
        width: 700px;
        height: calc(100vh - 100px);
        margin: 0 auto;

        .checkbox-wrapper {
            border-right: 1px solid black;
            display: inline-block;
            padding-right: 20px;
            width: 250px;
            float: left;
            height: 100%;
        }

        .appointment-wrapper {
            display: inline-block;
            width: 450px;
            float: right;
            padding: 0  20px;
            height: 100%;
            overflow: auto;

            .appointment {
                border: 1px solid $color-darkest-blue;
                background-color: $color-gray;
                padding: 10px 10px 10px 0;
                margin-bottom: 10px;
                position: relative;

                &:hover .cancel-btn {
                    display: inline-block;
                }

                .cancel-btn {
                    display: none;
                    position: absolute;
                    top: -1px;
                    right: -20px;
                    width: 20px;
                    height: 20px;
                    padding: 0 4px;
                    border: 1px solid $color-darkest-blue;
                    background-color: $color-gray;
                    cursor: pointer;

                    div {
                        transform: rotate(45deg);

                        &:before {
                            content: "+";
                        }
                    }

                }

                .cancel {
                    display: inline-block;
                    height: 40px;
                    width: 60px;
                    float: left;
                    text-align: center;
                    color: red;
                    font-weight: bold;
                    font-size: 14px;
                    transform: rotate(45deg);
                    position: relative;
                    top: 10px;
                    left: -8px;
                }

                .pos {
                    display: inline-block;
                    height: 40px;
                    width: 60px;
                    float: left;
                    text-align: center;
                }

                .info {
                    float: left;
                    width: fit-content;
                    position: relative;
                    top: 2px;

                    p {
                        margin: 0;
                    }

                    .hospital {
                        font-size: 110%;
                        font-weight: bold;
                    }

                    .department {
                        font-size: 95%;
                    }
                }

                .time {
                    margin: -10px 0;
                    float: right;
                    padding-left: 10px;
                    padding-top: 12px;
                    width: fit-content;
                    text-align: right;
                    height: 62px;
                    border-left: 1px dashed black;
                }

            }
        }
    }
</style>