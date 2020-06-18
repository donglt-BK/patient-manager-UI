<template>
    <div v-loading="hospitalLoading || departmentLoading || scheduleLoading">
        <p>Doctor Schedule</p>
        <div>
            <div class="select-wrapper">
                <el-select style="margin-right: 10px" v-model="chosenHospital" placeholder="Hospital"
                           @change="getDepartments"
                           no-data-text="No Hospital Found">
                    <el-option v-for="hospital in hospitals" :label="hospital.name" :value="hospital.id"/>
                </el-select>
                <el-select v-model="chosenDepartment" placeholder="Department" :disabled="chosenHospital === ''"
                           no-data-text="No Department Found" @change="getSchedules(true)">
                    <el-option v-for="department in departments" :label="department.name" :value="department.id"/>
                </el-select>
            </div>

            <div class="calendar-button-group">
                <el-button @click="prevWeek">Prev week</el-button>
                <el-button @click="today">Today</el-button>
                <el-button @click="nextWeek">Next week</el-button>
            </div>
        </div>

        <el-calendar v-loading="scheduleLoading" :range="[start, end]">
            <template slot="dateCell" slot-scope="{date, data}">
                <div v-if='' class="date-cell" v-bind:class="{'date-past': isDatePast(data.day)}">
                    <div class="date">
                        {{data.day.split("-")[2]}}{{isToday(data.day) ? ' - Today' : ''}}
                    </div>
                    <div class="shift-wrapper">
                        <div class="morning" v-bind:class="{past: isPast(data.day + '-MORNING')}">
                            <div v-if="schedule.has(data.day + '-MORNING')"
                                 :class="'percent ' + getStatus(data.day + '-MORNING')"
                                 :style="'width: ' + getPercent(data.day + '-MORNING')"/>
                            <div v-if="schedule.has(data.day + '-MORNING')"
                                 class="detail">{{schedule.get(data.day + '-MORNING').bookingStatus}} /
                                {{schedule.get(data.day + '-MORNING').limit}} slots
                            </div>
                            <SwitchButton class="switch" :value="!getIsClosed(data.day + '-MORNING')"
                                          :text="{on: 'OPEN', off: 'CLOSE'}"
                                          v-bind:class="{show: schedule.has(data.day + '-MORNING')}"
                                          @change="toggleOpen($event, data.day + '-MORNING')"/>
                            <div class="description">Morning</div>
                            <i class="el-icon-setting manage-button"
                               @click="showScheduleDialog(data.day + '-MORNING')"/>
                        </div>
                        <div class="afternoon" v-bind:class="{past: isPast(data.day + '-AFTERNOON')}">
                            <div v-if="schedule.has(data.day + '-AFTERNOON')"
                                 :class="'percent ' + getStatus(data.day + '-AFTERNOON')"
                                 :style="'width: ' + getPercent(data.day + '-AFTERNOON')"/>
                            <div v-if="schedule.has(data.day + '-AFTERNOON')"
                                 class="detail">{{schedule.get(data.day + '-AFTERNOON').bookingStatus}} /
                                {{schedule.get(data.day + '-AFTERNOON').limit}} slots
                            </div>
                            <SwitchButton class="switch" :value="!getIsClosed(data.day + '-AFTERNOON')"
                                          :text="{on: 'OPEN', off: 'CLOSE'}"
                                          v-bind:class="{show: schedule.has(data.day + '-AFTERNOON')}"
                                          @change="toggleOpen($event, data.day + '-AFTERNOON')"/>
                            <div class="description">Afternoon</div>
                            <i class="el-icon-setting manage-button"
                               @click="showScheduleDialog(data.day + '-AFTERNOON')"/>
                        </div>
                    </div>
                </div>
            </template>
        </el-calendar>

        <ScheduleDialog @close="getSchedules" ref="dialog"/>
    </div>
</template>

<script>
    import ManagerApi from "../../api/ManagerApi";
    import ScheduleApi from "../../api/ScheduleApi";
    import moment from "moment";
    import ScheduleDialog from "./component/ScheduleDialog";

    export default {
        name: "Schedule",
        components: {ScheduleDialog},
        data() {
            return {
                start: moment().day(-13).format("YYYY-MM-DD"),
                end: moment().day(21).format("YYYY-MM-DD"),
                hospitals: [],
                departments: [],
                chosenHospital: '',
                chosenDepartment: '',
                schedule: new Map(),
                hospitalLoading: false,
                departmentLoading: false,
                scheduleLoading: false
            }
        },
        methods: {
            getStatus(key) {
                let percent = this.getPercent(key).replace("%", "");
                percent = parseInt(percent);
                if (percent === 100) {
                    return "full";
                }
                if (percent > 65) {
                    return "almost";
                }
                if (percent > 40) {
                    return "ok";
                }
                return "nice"
            },
            getPercent(key) {
                let data = this.schedule.get(key);
                if (data) {
                    if (data.limit === 0) return 0;
                    return data.bookingStatus / data.limit * 100 + "%";
                }
                return 0;
            },
            showScheduleDialog(key) {
                if (!this.chosenDepartment) {
                    this.$services.alert.info("Choose department first");
                    return;
                }

                if (this.schedule.has(key)) this.$refs.dialog.show(this.schedule.get(key));
                else this.$refs.dialog.show({
                    doctors: [],
                    departmentId: this.chosenDepartment,
                    limit: this.limit,
                    shift: key.split("-")[3],
                    date: key.split("-", 3).join("-")
                });
            },
            getIsClosed(key) {
                return this.schedule.has(key) ? this.schedule.get(key).closed : true;
            },
            toggleOpen(val, key) {
                if (this.isPast(key)) return;

                if (!this.chosenDepartment) {
                    this.$services.alert.info("Choose department first");
                    return;
                }

                let schedule = this.schedule.get(key);
                if (!schedule) {
                    schedule = {
                        shift: key.split("-")[3],
                        date: key.split("-", 3).join("-"),
                    }
                }
                ScheduleApi.toggle({
                    date: moment(schedule.date).format("YYYY-MM-DD"),
                    shift: schedule.shift,
                    isClosed: !val.value,
                    departmentId: this.chosenDepartment
                }).then(this.getSchedules)
            },
            getUrl(url) {
                return this.$utils.buildFileUrl(url);
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
                this.chosenDepartment = '';
                this.schedule = new Map();
                this.departmentLoading = true;
                ManagerApi.listManageDepartment(this.chosenHospital).then(response => {
                    this.departmentLoading = false;
                    this.departments = response;
                })
            },
            getSchedules(reset = false) {
                if (reset) this.schedule = new Map();
                this.scheduleLoading = true;
                ScheduleApi.list({
                    start: this.start,
                    end: this.end,
                    departmentId: this.chosenDepartment
                }).then(res => {
                    this.scheduleLoading = false;
                    res.forEach(schedule => {
                        this.schedule.set(moment(schedule.date).format("YYYY-MM-DD") + "-" + schedule.shift, schedule);
                    });
                })
            },
            isDatePast(d) {
                let today = moment().format('YYYY-MM-DD');
                if (today !== d) return d < today;
                return moment().format("HH") > '12';
            },
            isPast(key) {
                let shift = key.split("-")[3];
                let date = key.split("-", 3).join("-");

                let today = moment().format('YYYY-MM-DD');
                if (today !== date) return date < today;
                if (shift === 'AFTERNOON') return true;
                return moment().format("HH") > '12'
            },
            isToday(d) {
                return moment().format('YYYY-MM-DD') === d;

            }
        },
        mounted() {
            this.hospitalLoading = true;
            ManagerApi.listManageHospital().then(response => {
                this.hospitalLoading = false;
                this.hospitals = response;
            })
        }
    }
</script>

<style scoped lang="scss">
    /deep/ .el-calendar-day {
        padding: 0;
        height: 200px;
    }

    /deep/ .el-calendar-table, /deep/ .el-calendar-table td {
        border-collapse: collapse;
    }

    /deep/ .is-today {
        color: black !important;
    }

    /deep/ .el-calendar-table thead {
        position: sticky;
    }

    .select-wrapper {
        display: inline-block;
        margin-bottom: 10px;
    }

    .calendar-button-group {
        display: inline-block;
        float: right;
    }

    .date-cell {
        height: 100%;
        background: #ffffff;

        .date {
            padding: 7px;
            height: 30px;
            color: black !important;
        }

        .shift-wrapper {
            height: calc(100% - 30px);
            display: flex;
            flex-direction: column;

            > * {
                padding: 5px 5px 5px 10px;
                height: 100%;
                flex: 1;
                border-top: 0.5px dashed gray;
                position: relative;

                .description {
                    width: fit-content;
                    padding: 4px;
                    font-size: 16px;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    color: black;
                    text-align: right;
                    display: none;
                }

                .manage-button {
                    display: none;
                    padding: 5px;
                    position: absolute;
                    left: 75px;
                    bottom: 1px;
                }

                .switch {
                    position: absolute !important;
                    left: 4px !important;
                    bottom: 4px !important;
                    display: none !important;

                    &.show {
                        display: inline-block !important;
                    }
                }

                &:not(.past):hover {
                    .manage-button, .switch {
                        display: inline-block !important;
                    }
                }

                .detail {
                    width: 100%;
                    position: absolute;
                    top: 20px;
                    left: 0;
                    text-align: center;
                }

                .percent {
                    position: absolute;
                    height: 100%;
                    top: 0;
                    left: 0;

                    &.nice {
                        background-color: #98ff98;
                    }

                    &.ok {
                        background-color: #ffff94;
                    }

                    &.almost {
                        background-color: #ffd07a;
                    }

                    &.full {
                        background-color: #ffaeae;
                    }
                }
            }

            /deep/ .past {
                cursor: default !important;
            }

            .morning:not(.past):hover, .afternoon:not(.past):hover {
                background: #eaeaea;
            }
        }

        &:hover:not(.date-past) {
            background: #d0d0d0;

            .date {
                background: #d5e7ff;
            }

            .morning, .afternoon {
                background: #f5f5f5;
            }

            .description {
                display: inline-block;
            }
        }

        /deep/ &.date-past {
            cursor: default !important;
            background-color: #f6f6f6;
        }
    }
</style>