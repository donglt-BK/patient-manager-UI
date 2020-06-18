<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" v-loading="loading" center width="500px" @close="$emit('close')">
            <div slot="title" class="bold text-center">
                <SwitchButton :value="!closed" :text="{on: 'OPEN', off: 'CLOSE'}"
                              @change="toggleOpen" style="float: left; position: relative; top: -2px; left: 25px"/>
                {{date}} {{shift}} SCHEDULE
            </div>
            <div class="info-wrapper">
                <div class="label">
                    <p>Date</p>
                    <p>Shift</p>
                    <p>Current patient appointment</p>
                    <InputLabel style='width: auto; margin-top: 5px' text="Schedule appointment limit" :required="true"/>
                </div>
                <div class="info">
                    <p>{{date}}</p>
                    <p>{{shift}}</p>
                    <p>{{bookingStatus}}</p>
                    <el-input v-model="limit" @change="change" type="number"></el-input>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment';
    import ScheduleApi from "../../../api/ScheduleApi";

    export default {
        name: "ScheduleDialog",
        props: {
            title: {
                type: String,
                default: "",
            },
            color: {
                type: String,
                default: "",
            }
        },
        data() {
            return {
                loading: false,
                dialogVisible: false,
                key: "",
                shift: "",
                date: "",
                closed: true,
                limit: 100,
                departmentId: -1,
                bookingStatus: 0,
            }
        },
        methods: {
            toggleOpen(isOpen) {
                if (this.bookingStatus > 0) this.$services.alert.error("Already have patient appointment")
                else {
                    this.closed = !isOpen.value;
                    ScheduleApi.toggle({
                        date: this.date,
                        shift: this.shift,
                        isClosed: this.closed,
                        departmentId: this.departmentId
                    })
                }
            },
            change() {
                ScheduleApi.create({
                    date: this.date,
                    shift: this.shift,
                    limit: this.limit,
                    isClosed: this.closed,
                    departmentId: this.departmentId
                })
            },
            getUrl(url) {
                return this.$utils.buildFileUrl(url);
            },
            show({departmentId, shift, date, limit, closed}) {
                this.dialogVisible = true;
                this.departmentId = departmentId;
                this.shift = shift;
                this.date = moment(date).format("YYYY-MM-DD");
                this.limit = limit;
                this.closed = closed;
            },
        },
    }
</script>

<style scoped lang="scss">

    .info-wrapper {
        display: flex;
        padding: 0 20px;
        flex: 2;

        > div{
            display: inline-block;
        }

        .label {
            flex: 2;
        }

        .info {
            flex: 1;
        }
    }
</style>