<template>
    <div class="user-info-wrapper">
        <div class="edit" v-if="edit">
            <InputLabel style='width: auto' text="Hospital name" :required="true"/>
            <el-input v-model="userInfo.name"></el-input>

            <InputLabel style='width: auto' text="Hospital name" :required="true"/>
            <el-input v-model="userInfo.username"></el-input>

            <InputLabel style='width: auto' text="Hospital name" :required="true"/>
            <el-select v-model="userInfo.gender">
                <el-option label="Male" value="MALE"/>
                <el-option label="Female" value="FEMALE"/>
            </el-select>

            <InputLabel style='width: auto' text="Phone" :required="true"/>
            <el-input v-model="userInfo.phone"></el-input>

            <InputLabel style='width: auto' text="Hospital name" :required="true"/>
            <el-input v-model="userInfo.email"></el-input>

            <AddressSelect ref="address"></AddressSelect>
        </div>
        <div v-else>

        </div>
    </div>
</template>

<script>
    import Roles from "../../security/Roles";

    export default {
        name: "Profile",
        data() {
            return {
                edit: true,
                userInfo: this.$auth.getCurrentUser(),
                isDoctor: this.$auth.hasAnyRoles([Roles.DOCTOR])
            }
        },
        mounted() {
            console.log(this.$auth.getCurrentUser().address)
            this.$refs.address.load(this.$auth.getCurrentUser().address);
        }
    }
</script>

<style scoped>

</style>