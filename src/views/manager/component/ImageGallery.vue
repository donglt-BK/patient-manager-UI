<template>
    <div class="gallery-wrapper" v-loading="isLoading">
        <div v-if="!isLoading" v-for="img in images" class="img-wrapper">
            <div class="remove" @click="remove(img)"/>
            <img :src="getUrl(img)">
        </div>
        <el-upload ref="uploader" class="uploader" :action="domain + '/file/upload'"
                   :show-file-list="false" :on-success="uploadSuccess">
            <i class="el-icon-plus add-button"/>
        </el-upload>
    </div>
</template>

<script>
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
                this.images = images;
            },
            getUrl(url) {
                return this.$utils.buildFileUrl(url);
            },
            uploadSuccess(url) {
                this.images.push(url);
                this.$refs.uploader.uploadFiles = [];
                this.$emit("uploaded", url);
            },
            remove(url) {
                this.images = this.images.filter(i => i !== url);
                this.$emit("remove", url);
            }
        }
    }
</script>

<style scoped lang="scss">
    .gallery-wrapper {
        height: 190px;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        .img-wrapper {
            height: 180px;
            display: inline-block;
            position: relative;
            margin-right: 10px;

            &:hover {
                background: #dcdcdc;
            }

            img {
                height: 100%;
            }

            .remove {
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

        .uploader {
            display: inline-block;
            height: 100%;

            /deep/ .el-upload {
                border: 1px dashed #9c9c9c;
                background: #eeeeee;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }

            .add-button {
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;

                &:hover {
                    background: #fafafa;
                }
            }
        }
    }
</style>