<template>
    <div class="department">
        <div class="header" @click="toggle">
            <p>{{data.name}}</p>
            <div class="unavailable" v-show="data.status === 'UNAVAILABLE'">UNAVAILABLE</div>
        </div>
        <div class="body" v-bind:class="{show: show}">
            <div class="img-wrapper" slot="title" @click="changeImage">
                <div v-for="(url, i) in data.files">
                    <img :src="getImage(url)" :class="{active: i === display}">
                </div>
            </div>
            <p style="padding: 0 10px">{{data.description}}</p>
            <el-button style="margin: 0 10px; width: calc(100% - 20px)" @click="makeAppointment">Make an Appointment
            </el-button>
        </div>
    </div>
</template>

<script>
    import Pages from "../../../router/Pages";

    export default {
        name: "DepartmentBox",
        props: {
            data: {
                type: Object,
                required: true
            }
        }, data() {
            return {
                show: false,
                display: 0
            }
        }, methods: {
            makeAppointment() {
                this.$router.push(Pages.book.path + "?id=" + this.data.id)
            },
            toggle() {
                if (this.data.status !== 'UNAVAILABLE') this.show = !this.show
            },
            getImage(url) {
                return this.$utils.buildFileUrl(url);
            },
            changeImage() {
                const data = this.data;
                if (data.files && data.files.length > 1) {
                    this.display++;
                    if (this.display === data.files.length) this.display = 0;
                }
            }
        },
        mounted() {
            setInterval(this.changeImage, 7000)
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/styles/var";

    .img-wrapper {
        cursor: pointer;
        width: 100%;
        height: 100px;
        overflow: hidden;
        border-bottom: 1px solid $color-darkest-gray;
        position: relative;

        div {
            height: 100%;
            width: 100%;
            position: absolute;
            text-align: center;

            img {
                height: 100%;
                transition: opacity 1s;
                opacity: 0;

                &.active {
                    opacity: 1;
                }
            }
        }
    }

    .department {
        margin-bottom: 10px;

        * {
            color: #fff;
        }

        .header {
            padding: 0 10px;
            background: $color-darkest-blue;
            cursor: pointer;
            position: relative;

            &.unavailable {
                cursor: default;
            }

            p {
                margin: 0;
                padding: 10px 0;
            }

            .unavailable {
                background: red;
                color: white;
                border-radius: 10px;
                height: 20px;
                width: fit-content;
                position: absolute;
                top: 8.5px;
                right: 15px;
                font-size: 12px;
                padding: 4px 6px;
                display: inline-block;
                z-index: 1;
            }
        }

        &:hover {
            .header {
                background: $color-darken-blue;
            }

            .body {
                border: 1px solid #bbbbbb;
            }
        }

        .body {
            height: 0;
            transition: height .7s;
            border: 1px solid #d5d5d5;
            overflow: hidden;

            &.show {
                height: 200px;
                //height: fit-content;
            }
        }
    }
</style>