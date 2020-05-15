<template>
    <label class="required">{{$t("common.requiredLabel")}}</label>
</template>

<script>
    export default {
        name: "RequireLabel"
    }
</script>

<style scoped>
    .required{
        color: #FFF;
        background-color: #fb4040;
        padding: 2px 5px;
        margin-left: 10px;
        border-radius: 3px;
        font-size: 70%;
    }
</style>
