<template>
    <div class="label-wrapper">
        <label>{{text}}</label>
        <RequireLabel v-show="required"/>
        <OptionalLabel v-show="optional"/>
        <span class="padding-left-20">
            <el-tag v-if="validationTip" type="danger">{{validationTip}}</el-tag>
        </span>
    </div>
</template>

<script>
    import OptionalLabel from "./OptionalLabel";
    import RequireLabel from "./RequireLabel";

    export default {
        name: "InputLabel",
        components: {OptionalLabel, RequireLabel},
        props: {
            text: {
                type: String,
                required: true
            },
            validationTip: {
                type: String,
                required: false
            },
            required: {
                type: Boolean,
                required: false,
                default: false
            },
            optional: {
                type: Boolean,
                required: false,
                default: false
            }
        }
    }
</script>

<style scoped>
    .label-wrapper {
        display: inline-block;
        width: 100%;
        line-height: 30px;
        position: relative;
        font-size: 14px;
        margin-bottom: 10px;
    }
</style>
