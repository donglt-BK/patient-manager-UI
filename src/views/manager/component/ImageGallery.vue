<template>
    <div>
        <div v-loading="isLoading">
            <div v-if="!isLoading" v-for="img in images" class="img-wrapper">
                <img :src="img">
            </div>
            <el-upload ref="uploader" class="uploader" :action="domain + '/file/upload'"
                       :show-file-list="false" :on-success="uploadSuccess">
                <i class="el-icon-plus add-button"/>
            </el-upload>
        </div>
    </div>
</template>

<script>
    import Util from "../../../util";

    export default {
        name: "ImageGallery",
        data() {
            return {
                images: [],
                isLoading: false,
                domain: process.env.VUE_APP_BACKEND_URL
            }
        },
        methods: {
            loading() {
                this.images = [];
                this.loading = true;
            },
            loadImage(images) {
                this.isLoading = false;
                this.images = images.map(url => Util.buildFileUrl(url));
            },
            uploadSuccess(url) {
                this.images.push(Util.buildFileUrl(url));
                this.$refs.uploader.uploadFiles = [];
                this.$emit("uploaded", url);
            }
        }
    }
</script>

<style scoped lang="scss">
    .img-wrapper {
        height: 180px;
        display: inline-block;
        img {
            height: 100%;
            padding-right: 10px;
        }
    }
    .uploader {
        display: inline-block;
        /deep/ .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;

            &:hover {
                border-color: #409EFF;
            }
        }

        .add-button {
            font-size: 28px;
            color: #8c939d;
            width: 180px;
            height: 180px;
            line-height: 180px;
            text-align: center;

            &:hover {
                background: #fafafa;
            }
        }
    }
</style>