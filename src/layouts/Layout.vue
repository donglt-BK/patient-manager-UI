<template>
    <el-container style="height: 100%" direction="vertical">
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
    </el-container>
</template>

<script>
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
            Header,
        },
    };
</script>

<style scoped lang="scss">

    @media only screen and (max-width: 768px) {
        /deep/ .el-main{
            padding: 0px !important;
        }
    }

    @media only screen and (min-width: 768px) {
        .app-container{
            margin-left: 10px;
            margin-right: 10px;
        }
    }
    @media only screen and (min-width: 992px) {
        .app-container{
            margin-left: 100px;
            margin-right: 100px;
        }
    }
    .page-title {
        text-align: left;
    }

    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }

    .app-breadcrumb {
        margin: 35px 0px;

        /deep/ .el-breadcrumb__item {
            font-size: 20px !important;
        }

        /deep/ .app-breadcrumb-item .el-breadcrumb__inner {
            font-weight: 700;
            text-decoration: none;
            -webkit-transition: color .2s cubic-bezier(.645, .045, .355, 1);
            transition: color .2s cubic-bezier(.645, .045, .355, 1);
            color: #303133 !important;
            cursor: pointer;
        }
    }

</style>
