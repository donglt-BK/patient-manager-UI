<template>
    <div v-click-outside="closeDetail" class="manager-wrapper">
        <div class="avatar-wrapper">
            <img @click="open = true" :src="getUrl(data.avatar)"/>
        </div>
        <div class="detail-info" v-bind:class="{open: open}">
            <div class="close"/>
            <div class="avatar-wrapper">
                <img @click="open = true" :src="getUrl(data.avatar)"/>
            </div>
            <div class="name-wrapper">
                <p class="name">{{data.name}}</p>
                <p class="username">{{data.username}}</p>
            </div>
            <el-button class="remove" @click="$emit('removeManager', data.id)">Remove manager</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Manager",
        props: {
            data: {
                type: Object,
                require: true
            }
        },
        data() {
            return {
                open: false
            }
        },
        methods: {
            getUrl(url) {
                return this.$utils.buildFileUrl(url);
            },
            closeDetail() {
                this.open = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    .manager-wrapper {
        position: relative;
        margin-left: -5px;
        display: inline-block;

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

        .detail-info {
            display: none;
            position: absolute;
            background: white;
            border-radius: 5px;
            border: 1px solid #bbbbbb;
            padding: 10px;
            width: 250px;

            .name-wrapper {
                position: absolute;
                top: 10px;
                left: 65px;
                width: 160px;
                display: inline-block;

                p {
                    margin: 0;

                    &.name {
                        font-weight: bold;
                    }

                    &.username {
                        font-size: 90%;
                    }
                }
            }

            .avatar-wrapper {
                display: inline-block;
                height: 50px;
                width: 50px;
            }

            .remove {
                width: 100%;

                background: red;
                color: white;

                &:hover {
                    background: #9e0315;
                }
            }

            &.open {
                display: inline-block;
            }

            .close {
                position: absolute;
                right: 10px;
                top: 5px;
                transform: rotate(45deg);
                font-size: 20px;
                cursor: pointer;

                &:hover {
                    font-weight: bold;
                }

                &:before {
                    content: "+";
                    rotation: 45deg;
                }
            }
        }
    }

</style>