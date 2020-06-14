<template>
    <div class="user-info-wrapper">
        <div class="display" v-if="!edit">
            <div>
                <span>Username</span>{{userInfo.user.username}}
            </div>
            <div>
                <span>ID</span>{{userInfo.user.id}}
            </div>
            <div>
                <span>Name</span>{{userInfo.user.name}}
            </div>
            <div>
                <span>Gender</span>{{userInfo.user.gender}}
            </div>
            <div>
                <span>Username</span>{{userInfo.user.username}}
            </div>
            <div>
                <span>Username</span>{{userInfo.user.username}}
            </div>
            <div>
                <span>Username</span>{{userInfo.user.username}}
            </div>
            <div v-if="isDoctor">
                <p>Doctor license</p>
                <el-image :src="userInfo.doctor.license"/>
            </div>
        </div>
        <div v-else>

        </div>
    </div>
</template>

<script>
    import Auth from "../../security/Authentication";
    import Roles from "../../security/Roles";

    export default {
        name: "Profile",
        data() {
            console.log("load")
            return {
                edit: false,
                userInfo: Auth.getCurrentUser(),
                isDoctor: Auth.hasAnyRoles([Roles.DOCTOR])
            }
        }
    }
</script>

<style scoped>

</style>