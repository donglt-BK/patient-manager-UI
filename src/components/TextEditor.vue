<template>
    <div id="text-editor" v-loading.fullscreen.lock="isLoading">
        <editor
                :disabled="disabled"
                v-model="displayContent"
                api-key="no-api-key"
                :initialValue="init"
                :init="editorConfig"
        />
        <div class="el-loading-mask is-fullscreen hidden" style="z-index: 10000 !important;">
            <div class="el-loading-spinner">
                <svg viewBox="25 25 50 50" class="circular">
                    <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
                </svg><!----></div>
        </div>
    </div>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue'
    import FileService from "@/service/file.service";
    import i18n from "@/i18n";

    export default {
        name: "TextEditor",
        components: {
            'editor': Editor
        },
        props: {
            content: String,
            disabled: {
                type: Boolean,
                default: false,
            },
            height: {
                type: Number,
                default: 200
            }
        },
        created() {
            this.init = this.content;
            this.displayContent = this.content;
        },
        data() {
            return {
                isLoading: false,
                init: null,
                displayContent: null,
                editorConfig: {
                    height: this.height,
                    menubar: false,
                    language: i18n.getCurrentLang() === 'en' ? 'en' : 'ja',
                    plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons',
                    toolbar: 'fontsizeselect formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | numlist bullist | forecolor backcolor removeformat | link charmap code preview fullscreen',
                    file_picker_types: 'file image media',
                    file_picker_callback: function (callback, value, meta) {
                        if (meta.filetype === 'image' || meta.filetype === 'media') {
                            $("#text-editor").append("<input name=\"image\" type=\"file\" id=\"text-upload\" class=\"hidden\">");
                            let textUpload = $("#text-upload");
                            textUpload.click();
                            textUpload.on('change', function (event) {
                                let formData = new FormData();
                                formData.append("file", this.files[0]);
                                $(".is-fullscreen").removeClass("hidden");
                                FileService.uploadFile(formData).then(function (response) {
                                    callback(response);
                                    $(".is-fullscreen").addClass("hidden");
                                    textUpload.remove();
                                }).catch(function (error) {
                                    $(".is-fullscreen").addClass("hidden");
                                    this.$services.alert.error("Upload Error");
                                    textUpload.remove();
                                });
                            });


                        }
                    },
                }
            }
        },
        watch: {
            content: function (newVal, oldVal) {
                this.init = newVal ? newVal : "";
                this.displayContent = newVal ? newVal : "";
            },
            displayContent: function (val) {
                this.$emit("update:content", val);
            },
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>
