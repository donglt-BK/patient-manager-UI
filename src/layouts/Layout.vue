<template>
    <el-container style="height: 100%; display: flex; flex-direction: row" direction="vertical">
        <Lefter @onExpandClick="onExpandClick"></Lefter>
        <div class="content-wrapper" v-bind:class="{close: !expand}">
            <Header></Header>
            <el-container class="app-container">
                <el-main>
                    <!-- customize content here -->
                    <transition name="fade" mode="out-in">
                        <router-view :pageTitle.sync="pageTitle" >
                            <!--Content goes here-->
                        </router-view>
                    </transition>
                </el-main>
            </el-container>
        </div>
    </el-container>
</template>

<script>
    import Lefter from "./modules/Lefter.vue";
    import Header from "./modules/Header.vue";

    export default {
        name: "Layout",
        computed: {},
        data() {
            return {
                pageTitle: "",
                expand: false,
                functionScope: this.$route.meta.functionScope,
            }
        },
        methods: {
            onExpandClick(isExpand) {
                this.expand = isExpand;
                console.log(isExpand)
            }
        },
        components: {
            Lefter, Header
        },
    };
</script>

<style scoped lang="scss">
    .content-wrapper {
        width: calc(100% - 170px);
        transition: width 0.5s, left 0.5s;
        position: relative;
        left: 170px;

        &.close {
            left: 50px;
            width: calc(100% - 50px);
        }
    }

    /deep/ .lefter-wrapper.close {
        .lefter-item p {
            width: 0;
        }
        .lefter-item:hover {
            .tooltip {
                display: block;
            }
        }
    }
</style>
