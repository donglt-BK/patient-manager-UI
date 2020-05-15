<template>
    <div>
        <div class="item-wrapper">
            <MenuItem v-for="menu in menuItems" :data="menu"/>
        </div>
    </div>
</template>

<script>
    import MenuList from "./MenuList";
    import Auth from "../../security/Authentication";
    import MenuItem from "./MenuItem";

    export default {
        name: "Menu",
        components: {MenuItem},
        data() {
            return {
                menuItems: MenuList.ALL.filter(menu => {
                    console.log(menu, Auth.hasAnyRoles(menu.authorize))
                    return Auth.hasAnyRoles(menu.authorize)
                })
            }
        }
    }
</script>

<style scoped>

</style>