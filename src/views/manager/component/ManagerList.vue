<template>
    <div>
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
                require: true
            }
        },
        methods: {
            removeManager(managerId) {
                console.log(managerId);
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
        background: #f1f1f1;
        border: 1px dashed #d9d9d9;
        display: inline-block;
        margin-left: -5px;

        i {
            font-size: 14px;
            color: #8c939d;
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