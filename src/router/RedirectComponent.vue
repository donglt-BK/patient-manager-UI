<template>
    <p>Redirecting....</p>
</template>

<script>
    import pages from '@/router/Pages';

    export default {
        name: "RedirectComponent",
        beforeMount() {
            /**  redirect user to default page based on user role. **/

            /**
             *  get current user
             */
            console.log(this.$auth.getCurrentUser());

            /**
             *  check current user has role : this.$auth.getCurrentUser().hasRole('SYSTEM_ADMIN')
             */
            if (this.$auth.getCurrentUser().hasRole('FACILITY_EMPLOYEE')) {
                let facilityCode = this.$auth.getCurrentUser().facilityCode;
                this.$router.push({path: pages.facilityEmployeeBookingStatus.path.replace(":facilityCode", facilityCode)});

            } else if (this.$auth.getCurrentUser().hasRole('SYSTEM_ADMIN')) {
                console.log("redirect system-admin to list menu.");
                this.$router.push({path: pages.systemMenu.path});
                //this.$router.push({path: pages.facilityAdminMenu.path});

            } else if (this.$auth.getCurrentUser().hasRole('FACILITY_ADMIN')) {
                console.log("redirect facility-admin to list menu.");
                this.$router.push({name: pages.facilityAdminMenu.name});
            }

        },
    }
</script>

<style scoped>

</style>
