<template>
    <div v-loading="loading">
        <div class="calendar-button-group">
            <el-button @click="prevWeek">Prev week</el-button>
            <el-button @click="today">Today</el-button>
            <el-button @click="nextWeek">Next week</el-button>
        </div>

        <el-calendar :range="[start, end]" v-loading="loading">
            <template slot="dateCell" slot-scope="{date, data}">
                <div v-if='' class="date-cell">
                    <div class="date">
                        {{data.day.split("-")[2]}}
                    </div>
                    <div class="shift-wrapper">
                        <div class="morning" v-if="schedule.has(data.day + '-MORNING')"
                             v-bind:class="{full: isFull(data.day + '-MORNING')}">
                            <div v-if="!isFull(data.day + '-MORNING')">
                                {{schedule.get(data.day + '-MORNING').limit - schedule.get(data.day +
                                '-MORNING').bookingStatus}}
                                / {{schedule.get(data.day + '-MORNING').limit}} slots
                            </div>
                            <div v-else>
                                Full
                            </div>
                            <div class="shift">Morning</div>
                        </div>
                        <div class="afternoon" v-if="schedule.has(data.day + '-AFTERNOON')"
                             v-bind:class="{full: isFull(data.day + '-AFTERNOON')}">
                            <div v-if="!isFull(data.day + '-AFTERNOON')">
                                {{schedule.get(data.day + '-AFTERNOON').limit - schedule.get(data.day +
                                '-AFTERNOON').bookingStatus}}
                                / {{schedule.get(data.day + '-AFTERNOON').limit}} slots
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
    </div>
</template>

<script>
    import Pages from "../../router/Pages";
    import ScheduleApi from "../../api/ScheduleApi";
    import moment from "moment";

    export default {
        name: "AppointmentBook",
        data() {
            return {
                departmentId: this.$route.query.id,
                loading: true,
                schedule: new Map(),
                start: moment().day(-13).format("YYYY-MM-DD"),
                end: moment().day(21).format("YYYY-MM-DD"),
            }
        },
        methods: {
            isFull(key) {
                console.log(this.schedule.get(key).limit)
                console.log(this.schedule.get(key).bookingStatus)
                return this.schedule.get(key).limit === this.schedule.get(key).bookingStatus;
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
            getSchedules() {
                this.scheduleLoading = true;
                ScheduleApi.list({
                    start: this.start,
                    end: this.end,
                    departmentId: this.departmentId
                }).then(res => {
                    this.scheduleLoading = false;
                    res.forEach(schedule => {
                        this.schedule.set(moment(schedule.date).format("YYYY-MM-DD") + "-" + schedule.shift, schedule);
                    });
                    this.loading = false;
                    console.log(this.schedule)
                })
            }
        },
        mounted() {
            if (!this.$route.query.id) {
                this.$router.push(Pages.home.path)
            }
            this.departmentId = this.$route.query.id;
            this.getSchedules(this.departmentId);
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
                border: 1px solid blue;
                background: #51a5ff;
                color: white;
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
                    cursor: default ;
                    background: #c4c4c4;
                    border: 1px solid #e8e8e8;
                }
            }
        }

        &:hover {
            .description {
                display: inline-block;
            }
        }
    }

</style>