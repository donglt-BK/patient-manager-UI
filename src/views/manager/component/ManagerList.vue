<template>
    <div style="display: inline-block">
        <Manager v-for="(m, index) in managers" :key="index" :data="m"
                 :style="'z-index: ' + (managers.length - index)"
                 @removeManager="removeManager"/>
        <div class="add" @click="showDialog">
            <i class="el-icon-plus add-button"/>
        </div>
        <AddUserDialog ref="addDialog" title="Manager" @addUser="addManager"/>
    </div>
</template>

<script>
    import Manager from "./Manager";
    import AddUserDialog from "./AddUserDialog";

    export default {
        name: "ManagerList",
        components: {AddUserDialog, Manager},
        props: {
            managers: {
                required: true
            }
        },
        methods: {
            removeManager(managerId) {
                this.$emit('removeManager', managerId);
            },
            addManager(managerId) {
                this.$emit('addManager', managerId);
            },
            showDialog() {
                this.$refs.addDialog.show(this.managers);
            }
        }
    }
</script>

<style scoped lang="scss">
    .add {
        height: 35px;
        width: 35px;
        overflow: hidden;
        border-radius: 50%;
        cursor: pointer;
        background: #eeeeee;
        border: 1px dashed #9c9c9c;
        display: inline-block;
        margin-left: -5px;

        i {
            font-size: 14px;
            color: #9c9c9c;
            width: 33px;
            height: 33px;
            line-height: 33px;
            text-align: center;

            &:hover {
                background: #fafafa;
            }
        }
    }
</style>