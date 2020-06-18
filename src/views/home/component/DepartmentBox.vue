<template>
    <div class="department">
        <div class="header" @click="toggle">
            <p>{{data.name}}</p>
            <div class="unavailable" v-show="data.status === 'UNAVAILABLE'">UNAVAILABLE</div>
        </div>
        <div class="body" v-bind:class="{show: show}">
            <div class="img-wrapper" slot="title">
                <img :src="getImage(data.image)">
            </div>
            <p style="padding: 0 10px; color: black ">{{data.description}}</p>
            <el-button style="margin: 0 10px 10px; width: calc(100% - 20px)" class="btn darken-blue" @click="makeAppointment">Make an Appointment
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
            }
        }, methods: {
            makeAppointment() {
                let routeData = this.$router.resolve(Pages.book.path + "?id=" + this.data.id);
                window.open(routeData.href, '_blank');
            },
            toggle() {
                if (this.data.status !== 'UNAVAILABLE') this.show = !this.show
            },
            getImage(url) {
                return this.$utils.buildFileUrl(url);
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/styles/var";

    .img-wrapper {
        width: 100%;
        height: 100px;
        overflow: hidden;
        border-bottom: 1px solid $color-darkest-gray;
        position: relative;
        line-height: 100px;
        text-align: center;

        img {
            max-height: 100%;
            max-width: 100%;
            vertical-align: middle;

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

        .body {
            max-height: 0;
            transition: max-height .7s;
            border: 1px solid #d5d5d5;
            overflow: hidden;

            &.show {
                max-height: 300px;
            }
        }
    }
</style>