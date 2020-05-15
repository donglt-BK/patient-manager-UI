<template>
    <el-upload
            ref="attachmentUploader"
            action="#"
            multiple
            :limit="5"
            :auto-upload="false">
        <el-button slot="trigger" size="small" class="custom-btn-color">{{ title ? title : 'Select files'}}</el-button>
    </el-upload>
</template>

<script>
    export default {
        name: "AttachmentsUploader",
        props: {
            title: String
        },
        created(){
        },
        methods: {
            getSelectedFiles() {
                return this.$refs['attachmentUploader'].uploadFiles
            },
            clearSelectedFiles(){
                this.$refs['attachmentUploader'].uploadFiles = [];
            }
        }
    }
</script>

<style scoped>

</style>