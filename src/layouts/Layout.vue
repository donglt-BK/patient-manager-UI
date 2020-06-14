<template>
    <el-container style="height: 100%; display: flex; flex-direction: row" direction="vertical">
        <Lefter></Lefter>
        <div class="content-wrapper">
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
                functionScope: this.$route.meta.functionScope,
            }
        },
        components: {
            Lefter, Header
        },
    };
</script>

<style scoped lang="scss">
    .content-wrapper {
        flex: 200;
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
