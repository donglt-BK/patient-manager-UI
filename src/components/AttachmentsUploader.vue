<template>
    <el-upload
            ref="attachmentUploader"
            action="#"
            :multiple="false"
            :limit="1"
            :auto-upload="false">
        <el-button slot="trigger" size="small" class="custom-btn-color">{{title}}</el-button>
    </el-upload>
</template>

<script>
    export default {
        name: "AttachmentsUploader",
        props: {
            title: {
                require: false,
                type: String,
                default: "Select files"
            }
        },
        created() {
        },
        methods: {
            getSelectedFiles() {
                return this.$refs['attachmentUploader'].uploadFiles
            },
            clearSelectedFiles() {
                this.$refs['attachmentUploader'].uploadFiles = [];
            }
        }
    }
</script>

<style scoped>

</style>