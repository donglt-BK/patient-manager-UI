<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" center width="400px">
            <div slot="title" class="bold text-center">Add {{title}}</div>

            <el-input placeholder="Search" v-model="key">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>

            <div v-if="founded.length > 0" class="user-wrapper">
                <div v-for="user in founded" class="user-item">
                    <div class="avatar-wrapper">
                        <img :src="getUrl(user.avatar)"/>
                    </div>
                    <div class="name">
                        <p>{{user.name}}</p>
                        <p>{{user.username}}</p>
                    </div>
                    <el-button class="btn darken-blue" v-if="!isCurrent(user.id)" @click="addUser(user.id)">Add
                    </el-button>
                    <el-button class="btn" v-else disabled>{{title}}</el-button>
                </div>
            </div>
            <div v-else style="padding: 20px; text-align: center">No user found</div>

            <div class="paging">
                <el-button class="nav-btn" @click="page++" :disabled="page===totalPages">></el-button>
                <el-input class="no-arrow page-number" type="number" min="1" :max="totalPages" v-model="page"/>
                <el-button class="nav-btn" @click="page--" :disabled="page===1"><</el-button>
                <span style="padding-top: 6px; font-size: 15px">Total {{totalPages}}</span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import UserApi from "../../../api/UserApi";

    export default {
        name: "AddUserDialog",
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
                founded: [],
                page: 1,
                first: true,
                last: true,
                numberOfElements: 0,
                totalElements: 0,
                totalPages: 0,
                current: []
            }
        },
        watch: {
            key() {
                this.page = 1;
                this.update();
            },
            page() {
                this.update();
            }
        },
        methods: {
            update() {
                UserApi.find({
                    key: this.key,
                    page: this.page,
                    size: 5
                }).then(response => {
                    this.founded = response.content;
                    this.first = response.first;
                    this.last = response.last;
                    this.numberOfElements = response.numberOfElements;
                    this.totalElements = response.totalElements;
                    this.totalPages = response.totalPages;
                })
            },
            isCurrent(id) {
                return this.current.includes(id);
            },
            getUrl(url) {
                return this.$utils.buildFileUrl(url);
            },
            show(currentUsers = []) {
                this.current = currentUsers.map(m => m.id);
                this.loading = false;
                this.dialogVisible = true;
                this.key = "";
                this.founded = [];
                this.page = 1;
                this.first = true;
                this.last = true;
                this.numberOfElements = 0;
                this.totalElements = 0;
                this.totalPages = 0
                this.update();
            },
            addUser(id) {
                this.current.push(id);
                this.$emit('addUser', id);
            }
        },
    }
</script>

<style scoped lang="scss">

    .user-wrapper {
        margin: 10px 0;
        overflow: auto;
        max-height: 300px;

        .user-item {
            border-top: 1px solid gray;
            padding: 10px;
            position: relative;

            &:hover {
                background-color: #e5e5e5;
            }
            &:first-child {
                border-top: none;
            }

            > * {
                display: inline-block;
            }

            .name {
                position: absolute;
                top: 13px;
                left: 60px;

                p {
                    margin: 0;

                }
            }

            .btn {
                position: absolute;
                right: 10px;
                top: 12px;
                height: 35px;
                padding: 0 10px;
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
        position: relative;
        top: 2px;

        img {
            width: 100%;
            opacity: .8;
        }

        &:hover {
            background: #d4d4d4;
        }
    }


    .paging {
        margin-bottom: 20px;
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