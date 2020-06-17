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
                <div v-if='' class="date-cell">
                    <div class="date">
                        {{data.day.split("-")[2]}}
                    </div>
                    <div class="shift-wrapper">
                        <div class="morning">
                            <div v-if="schedule.has(data.day + '-MORNING')">
                                <div v-if="schedule.has(data.day + '-MORNING')"
                                     v-for="(doctor, index) in getScheduleDoctor(data.day + '-MORNING')"
                                     :style="'z-index: ' + (getScheduleDoctor(data.day + '-MORNING').length - index)"
                                     class="avatar-wrapper">
                                    <img :src="getUrl(doctor.user.avatar)"/>
                                </div>
                                <div v-if="getExceed(data.day + '-MORNING') > 0" class="exceed">
                                    +{{getExceed(data.day + '-MORNING')}}
                                </div>
                            </div>
                            <SwitchButton class="switch" :value="!getIsClosed(data.day + '-MORNING')"
                                          :text="{on: 'OPEN', off: 'CLOSE'}"
                                          v-bind:class="{show: have(data.day + '-MORNING')}"
                                          @change="toggleOpen($event, data.day + '-MORNING')"/>
                            <div class="description">Morning</div>
                            <i class="el-icon-setting manage-button"
                               @click="showScheduleDialog(data.day + '-MORNING')"/>
                        </div>
                        <div class="afternoon">
                            <div v-if="schedule.has(data.day + '-AFTERNOON')">
                                <div v-if="schedule.has(data.day + '-AFTERNOON')"
                                     v-for="(doctor, index) in getScheduleDoctor(data.day + '-AFTERNOON')"
                                     :style="'z-index: ' + (getScheduleDoctor(data.day + '-AFTERNOON').length - index)"
                                     class="avatar-wrapper">
                                    <img :src="getUrl(doctor.user.avatar)"/>
                                </div>
                                <div v-if="getExceed(data.day + '-AFTERNOON') > 0" class="exceed">
                                    +{{getExceed(data.day + '-AFTERNOON')}}
                                </div>
                            </div>
                            <SwitchButton class="switch" :value="!getIsClosed(data.day + '-AFTERNOON')"
                                          :text="{on: 'OPEN', off: 'CLOSE'}"
                                          v-bind:class="{show: have(data.day + '-AFTERNOON')}"
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
            getScheduleDoctor(key) {
                let doctors = this.schedule.get(key).doctors;
                if (doctors.length <= 5) return doctors;
                return doctors.slice(0, 4);
            },
            have(key) {
                return this.schedule.has(key);
            },
            get(key) {
                return this.schedule.get(key);
            },
            getIsClosed(key) {
                return this.schedule.has(key) ? this.get(key).closed : true;
            },
            toggleOpen(val, key) {
                if (!this.chosenDepartment) {
                    this.$services.alert.info("Choose department first");
                    return;
                }

                let schedule = this.get(key);
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
            getExceed(key) {
                return this.schedule.get(key).doctors.length - 5;
            },
            getUrl(url) {
                return this.$utils.buildFileUrl(url);
            },
            today() {
                this.start = moment().day(-13).format("YYYY-MM-DD");
                this.end = moment().day(14).format("YYYY-MM-DD");
                console.log(this.start);
                console.log(this.end);
            },
            nextWeek() {
                this.start = moment(this.start).add('d', 7).format("YYYY-MM-DD");
                this.end = moment(this.end).add('d', 7).format("YYYY-MM-DD");
            },
            prevWeek() {
                this.start = moment(this.start).add('d', -7).format("YYYY-MM-DD");
                this.end = moment(this.end).add('d', -7).format("YYYY-MM-DD");
            },
            getDepartments() {
                this.chosenDepartment = '';
                this.schedule = new Map();
                this.departmentLoading = true;
                ManagerApi.listManageDepartment(this.chosenHospital).then(response => {
                    console.log(response)
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
            }
        },
        mounted() {
            console.log(this.start);
            console.log(this.end);
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
    }

    .calendar-button-group {
        display: inline-block;
        float: right;
    }

    .avatar-wrapper {
        height: 35px;
        width: 35px;
        overflow: hidden;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        margin-left: -5px;
        display: inline-block;

        img {
            width: 100%;
        }
    }

    .exceed {
        height: 35px;
        width: 35px;
        overflow: hidden;
        border-radius: 50%;
        cursor: pointer;
        background: #f1f1f1;
        border: 1px dashed #d9d9d9;
        display: inline-block;
        margin-left: -5px;
        padding: 9px;
        font-size: 14px;
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
                    color: #b4b4b4;
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

                &:hover {
                    .manage-button, .switch {
                        display: inline-block !important;
                    }
                }
            }

            .morning:hover, .afternoon:hover {
                background: #eaeaea;
            }
        }


        &:hover {
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
    }
</style>