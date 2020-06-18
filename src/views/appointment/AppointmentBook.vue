<template>
    <div v-loading="scheduleLoading || departmentLoading">
        <div class="clearfix" style="margin-bottom: 10px">
            <div class="breadcrumb">
                <span class="hospital">{{hospital}}</span>
                <span>{{department}}</span>
            </div>
            <div class="calendar-button-group">
                <el-button @click="prevWeek">Prev week</el-button>
                <el-button @click="today">Today</el-button>
                <el-button @click="nextWeek">Next week</el-button>
            </div>
        </div>


        <el-calendar :range="[start, end]" v-loading="scheduleLoading || departmentLoading">
            <template slot="dateCell" slot-scope="{date, data}">
                <div v-if='' class="date-cell">
                    <div class="date">
                        {{data.day.split("-")[2]}}
                    </div>
                    <div class="shift-wrapper">
                        <div class="morning btn darken-blue" v-if="available(data.day + '-MORNING')"
                             v-bind:class="{full: isFull(data.day + '-MORNING')}"
                             @click="showDialog(data.day + '-MORNING')">
                            <div v-if="!isFull(data.day + '-MORNING')">
                                {{schedule.get(data.day + '-MORNING').limit - schedule.get(data.day +
                                '-MORNING').bookingStatus}} slots left
                            </div>
                            <div v-else>
                                Full
                            </div>
                            <div class="shift">Morning</div>
                        </div>
                        <div class="afternoon btn darken-blue" v-if="available(data.day + '-AFTERNOON')"
                             v-bind:class="{full: isFull(data.day + '-AFTERNOON')}"
                             @click="showDialog(data.day + '-AFTERNOON')">
                            <div v-if="!isFull(data.day + '-AFTERNOON')">
                                {{schedule.get(data.day + '-AFTERNOON').limit - schedule.get(data.day +
                                '-AFTERNOON').bookingStatus}} slots left
                            </div>
                            <div v-else>
                                Full
                            </div>
                            <div class="shift">Afternoon</div>
                        </div>
                    </div>
                </div>
            </template>
        </el-calendar>

        <ConfirmDialog ref="dialog"></ConfirmDialog>
    </div>
</template>

<script>
    import Pages from "../../router/Pages";
    import ScheduleApi from "../../api/ScheduleApi";
    import moment from "moment";
    import ConfirmDialog from "./component/ConfirmDialog";
    import ManagerApi from "../../api/ManagerApi";

    export default {
        name: "AppointmentBook",
        components: {ConfirmDialog},
        data() {
            return {
                departmentId: this.$route.query.id,
                scheduleLoading: true,
                departmentLoading: true,
                schedule: new Map(),
                start: moment().day(-13).format("YYYY-MM-DD"),
                end: moment().day(21).format("YYYY-MM-DD"),
                hospital: '',
                department: ''
            }
        },
        methods: {
            available(key) {
                return this.schedule.has(key) && !this.schedule.get(key).closed;
            },
            isFull(key) {
                return this.schedule.get(key).limit === this.schedule.get(key).bookingStatus;
            },
            today() {
                this.start = moment().day(-13).format("YYYY-MM-DD");
                this.end = moment().day(14).format("YYYY-MM-DD");
                this.getSchedules();
            },
            nextWeek() {
                this.start = moment(this.start).add('d', 7).format("YYYY-MM-DD");
                this.end = moment(this.end).add('d', 7).format("YYYY-MM-DD");
                this.getSchedules();
            },
            prevWeek() {
                this.start = moment(this.start).add('d', -7).format("YYYY-MM-DD");
                this.end = moment(this.end).add('d', -7).format("YYYY-MM-DD");
                this.getSchedules();
            },
            getDepartments() {
                this.departmentLoading = true;

                ManagerApi.departmentDetail(this.departmentId).then(res => {
                    this.departmentLoading = false;
                    this.hospital = res.hospitalName;
                    this.department = res.name;
                });

            },
            getSchedules() {
                this.scheduleLoading = true;
                ScheduleApi.listBook({
                    start: this.start,
                    end: this.end,
                    departmentId: this.departmentId
                }).then(res => {
                    this.scheduleLoading = false;
                    if (res.length === 0) {
                        this.$services.alert.info("No available appointment from " + this.start + " to " + this.end)
                    }
                    res.forEach(schedule => {
                        this.schedule.set(moment(schedule.date).format("YYYY-MM-DD") + "-" + schedule.shift, schedule);
                    });
                })
            },
            showDialog(key) {
                this.$refs.dialog.show(this.schedule.get(key), this.hospital, this.department);
            }
        },
        mounted() {
            if (!this.$route.query.id) {
                this.$router.push(Pages.home.path)
            } else {
                this.departmentId = this.$route.query.id;
                this.getDepartments();
                this.getSchedules();
            }
        }
    }
</script>

<style scoped lang="scss">
    /deep/ .el-calendar-day {
        padding: 0;
        height: fit-content;
    }

    /deep/ .el-calendar-table, /deep/ .el-calendar-table td {
        border-collapse: collapse;
    }

    /deep/ .is-today {
        color: black !important;
    }

    .date-cell {
        height: fit-content;
        background: #ffffff;
        min-height: 110px;

        .date {
            padding: 7px;
            height: 30px;
            color: black !important;
            border-bottom: 0.5px dashed gray;
        }

        .shift-wrapper {
            height: fit-content;

            > * {
                padding: 25px 5px 5px 10px;
                margin: 5px;
                height: 80px;
                border-radius: 5px;

                position: relative;

                text-align: center;

                .shift {
                    width: fit-content;
                    padding: 4px;
                    font-size: 12px;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    color: white;
                    text-align: left;
                    display: inline-block;
                }

                &.full {
                    cursor: default;
                    background: #c4c4c4;
                    border: 1px solid #e8e8e8;

                    &:hover {
                        background: #a3a3a3 !important;
                    }
                }
            }
        }

        &:hover {
            .description {
                display: inline-block;
            }
        }
    }

    .breadcrumb {
        margin-top: 10px;
        float: left;

        .hospital {
            &:after {
                content: " > ";
            }
        }
    }

    .calendar-button-group {
        float: right;
    }
</style>