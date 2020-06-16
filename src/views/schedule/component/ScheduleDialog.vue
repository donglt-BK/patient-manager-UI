<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" v-loading="loading" center width="80%" @close="$emit('close')">
            <div slot="title" class="bold text-center">{{date}} {{shift}} SCHEDULE</div>
            <div class="dialog-content-wrapper">

                <div class="info-wrapper">
                    <InputLabel style='width: auto' text="Date" :required="true"/>
                    <el-input v-model="date" disabled></el-input>

                    <InputLabel style='width: auto' text="Shift" :required="true"/>
                    <el-input v-model="shift" disabled></el-input>

                    <InputLabel style='width: auto' text="Schedule appointment limit" :required="true"/>
                    <el-input v-model="scheduleLimit" @change="change" type="number"></el-input>

                    <InputLabel style='width: auto' text="Doctor appointment limit" :required="true"/>
                    <el-input v-model="doctorLimit" @change="change" type="number"></el-input>
                </div>

                <div class="not-assign-wrapper">
                    <p>Not Assign</p>
                    <div class="user-wrapper">
                        <div v-for="doctor in all" class="user-item">
                            <div class="avatar-wrapper">
                                <img :src="getUrl(doctor.user.avatar)"/>
                            </div>
                            <p>{{doctor.user.name}}</p>
                            <el-button class="btn" @click="addDoctor(doctor.id)">Assign</el-button>
                        </div>
                    </div>
                </div>

                <div class="assign-wrapper">
                    <p>Assign</p>
                    <div class="user-wrapper">
                        <div v-for="doctor in assign" class="user-item">
                            <div class="avatar-wrapper">
                                <img :src="getUrl(doctor.user.avatar)"/>
                            </div>
                            <p>{{doctor.user.name}}</p>
                            <el-button class="btn" @click="removeDoctor(doctor.id)">Remove</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ManagerApi from "../../../api/ManagerApi";
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
                all: [],
                assign: [],
                assignId: [],
                shift: "",
                date: "",
                doctorLimit: 0,
                scheduleLimit: 0,
                departmentId: -1,
                loaded: false
            }
        },
        methods: {
            change() {
                if (!this.loaded) return;
                ScheduleApi.create({
                    date: this.date,
                    shift: this.shift,
                    scheduleLimit: this.scheduleLimit,
                    doctorLimit: this.doctorLimit,
                    departmentId: this.departmentId
                })
            },
            getUrl(url) {
                return this.$utils.buildFileUrl(url);
            },
            show({doctors, departmentId, shift, date, scheduleLimit, doctorLimit}) {
                this.loaded = false;
                this.dialogVisible = true;
                this.all = [];
                this.assign = doctors;
                this.assignId = doctors.map(d => d.id)
                this.loading = true;
                this.departmentId = departmentId;
                this.shift = shift;
                this.date = moment(date).format("YYYY-MM-DD");
                this.scheduleLimit = scheduleLimit;
                this.doctorLimit = doctorLimit;
                this.loaded = true;

                ManagerApi.listAllDoctor(this.departmentId).then(response => {
                    this.loading = false;
                    this.all = response.filter(doctor => !this.assignId.includes(doctor.id));
                })
            },
            addDoctor(id) {
                this.loading = true;
                ScheduleApi.assign(this.date, this.shift, this.scheduleLimit, this.doctorLimit, id).then(() => {
                    this.loading = false;
                    let assigned = this.all.filter(d => d.id === id)[0];
                    this.assignId.push(id);
                    this.assign.push(assigned);
                    this.all = this.all.filter(d => d.id !== id);
                });
            },
            removeDoctor(id) {
                this.loading = true;
                ScheduleApi.deAssign(this.date, this.shift, id).then(() => {
                    this.loading = false;
                    let removed = this.assign.filter(d => d.id === id)[0];
                    this.assign = this.assign.filter(d => d.id !== id);
                    this.assignId = this.assignId.filter(i => i !== id);
                    this.all.push(removed);
                });
            }
        },
    }
</script>

<style scoped lang="scss">
    .dialog-content-wrapper {
        display: flex;
        flex-direction: row;

        .info-wrapper {
            padding: 0 20px;
            flex: 2;
        }

        .not-assign-wrapper {
            border-right: 1px solid gray;
        }

        .assign-wrapper, .not-assign-wrapper {
            flex: 1;
            padding: 0 20px;
            background-color: #eeeded;

            > p {
                margin: 0;
                padding: 8px 0;
                border-bottom: 1px solid gray;
                text-align: center;
            }

            .user-wrapper {
                overflow: auto;
                height: 295px;

                .user-item {
                    border-top: 1px solid gray;
                    padding: 10px;
                    position: relative;

                    &:first-child {
                        border-top: none;
                    }

                    > * {
                        display: inline-block;
                    }

                    > p {
                        position: absolute;
                        top: 5px;
                        left: 60px;
                    }

                    .btn {
                        position: absolute;
                        right: 0;
                        height: 35px;
                        padding: 0 10px;
                    }
                }
            }
        }
    }

    .avatar-wrapper {
        height: 35px;
        width: 35px;
        overflow: hidden;
        border-radius: 50%;
        cursor: pointer;
        background: #f1f1f1;

        img {
            width: 100%;
            opacity: .8;
        }

        &:hover {
            background: #d4d4d4;
        }
    }


    .paging {
        > * {
            display: inline-block;
            float: right;
            height: 30px;
            margin-left: 5px;
        }

        .nav-btn {
            background: gainsboro;
            width: 25px;
            padding: 0;
        }

        .page-number {
            width: 30px;

            /deep/ input {
                text-align: center;
                padding: 0;
                height: 30px;
            }
        }

        /deep/ .no-arrow {
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }
    }
</style>