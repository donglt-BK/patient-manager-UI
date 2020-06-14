<template>
    <div :class="'level ' + level">
        <span @click="returnManagement" class="management"
              v-bind:class="{returnable: canReturnTo === 'management'}">Management Hospital</span>
        <span @click="returnHospital" class="hospital"
              v-bind:class="{returnable: canReturnTo !== 'none'}"
              v-if="hospital">{{hospital}}</span>
        <span class="department" v-if="department">{{department}}</span>
    </div>
</template>

<script>
    import Auth from "../../../security/Authentication";
    import Roles from "../../../security/Roles";

    export default {
        name: "Breadcrumb",
        data() {
            return {
                level: "management",
                hospital: null,
                department: null,
                canReturnTo: "none"
            }
        },
        mounted() {
            let user = Auth.getCurrentUser();
            console.log(user);
            if (user.hasAnyRoles([Roles.SYSTEM_ADMIN]) || user.manageHospitalIds.length > 1) {
                console.log("full")
                this.canReturnTo = "management";
            } else if (user.hasAnyRoles([Roles.HOSPITAL_MANAGER]) || user.manageDepartmentIds.length > 1) {
                console.log("hospital")
                this.canReturnTo = "hospital";
            } else {
                console.log("none")
                this.canReturnTo = "none";
            }
        },
        methods: {
            returnManagement() {
                if (this.canReturnTo === "management" && this.level !== "management") {
                    this.department = null;
                    this.hospital = null;
                    this.level = "management";
                    this.$emit("returnManagement");
                }
            },
            returnHospital() {
                console.log(this.canReturnTo)
                if (this.canReturnTo !== "none" && this.level !== "hospital") {
                    this.department = null;
                    this.level = "hospital";
                    this.$emit("returnHospital");
                }
            },
            goToHospital(hospital) {
                this.hospital = hospital;
                this.level = "hospital";
            },
            goToDepartment(department) {
                this.department = department;
                this.level = "department";
            }
        }
    }
</script>

<style scoped lang="scss">
    .level {
        span.returnable {
            color: blue;
            cursor: pointer;
            &:hover {
                color: #0606fd;
            }

            &:active, &:focus {
                color: #2828ff;
            }
        }

        &.management .management, &.hospital .hospital {
            cursor: default;
            color: black;
            &:hover, &:active, &:focus {
                color: black;
            }
        }

        .hospital, .department {
            &:before {
                content: " > ";
                color: black;
            }
        }
    }
</style>