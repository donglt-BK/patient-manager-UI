<template>
    <div v-bind:class="{searched: searched}" style="position:relative;">
        <div v-bind:class="{show: key !== '' && searched && founded.length===0 && !keyLoading}"
             class="not-found">No hospital found
        </div>
        <el-input placeholder="Search hospital" v-model="key" class="search-input">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <div class="result-wrapper" v-loading="keyLoading">
            <div class="clearfix">
                <transition-group name="fade" tag="div">
                    <div class="hospital" v-for="h in founded" :key="h.id" @click="showHospital(h)"
                         v-bind:class="{unavailable: h.status === 'UNAVAILABLE'}">
                        <div class="unavailable">UNAVAILABLE</div>
                        <div class="img-wrapper">
                            <div v-for="(url, i) in h.files" :key="i">
                                <img :src="getHospitalImage(url)" :class="{active: i === h.display}">
                            </div>
                        </div>
                        <div class="info">
                            <p class="name">{{h.name}}</p>
                            <p class="address" v-if="isAddress(h.address.specificAddress)">
                                {{h.address.specificAddress}}</p>
                            <p class="address" v-else>{{h.address.block}}, {{h.address.district}}, {{h.address.city}},
                                {{h.address.country}}</p>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
        <div class="more" @click="loadMore" v-show="more" v-loading="extraLoading">Load more</div>
        <HospitalDialog ref="dialog"/>
    </div>
</template>

<script>
    import AppointmentApi from "../../api/AppointmentApi";
    import HospitalDialog from "./component/HospitalDialog";

    export default {
        name: "Home",
        components: {HospitalDialog},
        data() {
            return {
                key: '',
                page: 1,
                size: 8,
                founded: [],
                keyLoading: false,
                extraLoading: false,
                more: false,
                searched: false
            }
        },
        watch: {
            key(val) {
                if (val === '') {
                    setTimeout(() => {
                        if (this.key === '') {
                            this.searched = false;
                            this.keyLoading = false;
                            this.page = 1;
                            this.more = false;
                            this.founded = [];
                        }
                    }, 700)
                }
                let delay = this.searched ? 700 : 800
                const waitKey = val;
                setTimeout(() => {
                    if (this.key === waitKey) this.changeKey(false)
                }, delay)
            }
        },
        methods: {
            showHospital(h) {
                if (h.status === 'AVAILABLE') this.$refs.dialog.show(h);
            },
            isAddress(s) {
                return s && s !== '' && s !== 'Blank'
            },
            getHospitalImage(url) {
                return this.$utils.buildFileUrl(url);
            },
            changeKey() {
                if (this.key !== '') {
                    this.page = 1;
                    this.more = false;
                    this.keyLoading = true;
                    this.searched = true;
                    setTimeout(() => {
                        this.founded = [];
                        this.search();
                    }, 500)
                }
            },
            loadMore() {
                this.page++;
                this.extraLoading = true;
                this.$services.scrollBottom();
                setTimeout(() => {
                    this.search()
                }, 500);
            },
            search() {
                AppointmentApi.findHospital({
                    name: this.key,
                    page: this.page,
                    size: this.size
                }).then(res => {
                    this.keyLoading = false;
                    this.extraLoading = false;
                    this.more = res.totalPages > this.page;
                    res.content.forEach(h => {
                        if (h.files === '') h.files = ["noimage.png"]
                        else h.files = h.files.split("||");

                        h.display = 0;
                    })
                    this.founded.push(...res.content);
                })
            },
        },
        mounted() {
            setInterval(() => {
                const founded = this.founded;
                if (founded.length > 0) {
                    const index = Math.floor(Math.random() * founded.length);
                    const hospital = founded[index];
                    if (hospital.files.length > 1) {
                        hospital.display++;
                        if (hospital.display === hospital.files.length) hospital.display = 0;
                    }
                }
            }, 7000)
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/var";

    .search-input {
        margin-top: calc(50vh - 80px);
        width: 50%;
        margin-left: 25%;
        transition: margin-top 1s;
    }

    .more {
        margin: 0 -20px;
        position: absolute;
        bottom: -20px;
        text-align: center;
        padding: 20px;
        width: calc(100% + 40px);
        background-image: linear-gradient(transparent, #cecece);
        cursor: pointer;

        &:hover {
            background-image: linear-gradient(transparent, #a3a3a3);
        }
    }

    .result-wrapper {
        margin-top: 10px;
        min-height: 200px;
        position: relative;
        padding-bottom: 10px;

        /deep/ .el-loading-mask {
            background-color: $color-lightest-blue;
        }

        .hospital {
            float: left;
            display: inline-block;
            margin: 10px;
            height: 160px;
            width: 20%;
            background-color: white;
            border: 1px solid #e0e0e0;
            box-shadow: 5px 10px 8px #888888;
            position: relative;
            cursor: pointer;

            &:hover {
                .info {
                    background: #d0d0d0;
                }
            }

            &.unavailable {
                cursor: default;

                .unavailable {
                    display: inline-block;
                }
            }

            .unavailable {
                background: red;
                color: white;
                border-radius: 10px;
                height: 20px;
                width: fit-content;
                position: absolute;
                top: 5px;
                right: 5px;
                font-size: 12px;
                padding: 4px;
                display: none;
                z-index: 1;
            }

            &:nth-child(4n + 1) {
                margin-left: calc(10% - 30px);
            }

            .img-wrapper {
                width: 100%;
                height: 100px;
                overflow: hidden;
                border-bottom: 1px solid #e0e0e0;
                position: relative;

                div {
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    text-align: center;
                    line-height: 100px;

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

            .info {
                height: 60px;
                padding: 5px;

                .name {
                    margin: 0;
                    font-size: 15px;
                }

                .address {
                    margin-top: 3px;
                    overflow: hidden;
                    height: 60%;
                    text-overflow: ellipsis;
                    font-size: 10px;
                }
            }
        }
    }

    .not-found {
        opacity: 0;
        text-align: center;
        height: 200px;
        padding-top: 80px;
        transition: opacity 1s;
        position: absolute;
        width: 50%;
        left: 25%;
        top: 100px;
    }

    .searched {
        .search-input {
            margin-top: calc(70px);
        }

        .not-found.show {
            opacity: 1;
        }
    }
</style>