<template>
    <div :class="'breadcrumb darken-blue level ' + level">
        <span @click="returnManagement" class="management"
              v-bind:class="{returnable: canReturnTo === 'management' && level !== 'management'}">
            Management Hospital
        </span>
        <span @click="returnHospital" class="hospital"
              v-bind:class="{returnable: canReturnTo !== 'none' && level !== 'hospital'}"
              v-if="hospital">{{hospital}}
        </span>
        <span class="department" v-if="department">{{department}}</span>
    </div>
</template>

<script>
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
            let user = this.$auth.getCurrentUser();
            if (user.hasAnyRoles([Roles.SYSTEM_ADMIN]) || user.manageHospitalIds.length > 1 || user.manageDepartmentHospitalIds.length > 1) {
                this.canReturnTo = "management";
            } else if (user.hasAnyRoles([Roles.HOSPITAL_MANAGER]) || user.manageDepartmentIds.length > 1) {
                this.canReturnTo = "hospital";
            } else {
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
    @import "../../../assets/styles/var";

    .breadcrumb {
        margin: 0 -10px 10px    ;
        padding: 10px;
    }

    .level {
        span.returnable {
            color: $color-light-blue;
            cursor: pointer;

            &:hover, &:active, &:focus {
                text-decoration: underline;
            }
        }

        &.management .management, &.hospital .hospital, .department {
            cursor: default;
            color: white;

            &:hover, &:active, &:focus {
                color: white;
            }
        }

        .hospital, .department {
            &:before {
                content: " > ";
                color: white;
            }
        }
    }
</style>