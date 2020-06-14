<template>
    <div class="lefter-wrapper" v-bind:class="{close: !expand}">
        <div class="expander">
            <img :src="require('../../assets/images/icons/menu.png')" alt="expand" @click="expand = !expand">
        </div>
        <LefterItem v-for="item in lefterItems" :key="item.name" :item-data="item"/>
    </div>
</template>

<script>
    import LefterItem from "./LefterItem";
    import LefterItems from "./LefterItems";

    export default {
        name: "Lefter",
        components: {LefterItem},
        data() {
            return {
                expand: false,
                lefterItems: LefterItems.ALL//.filter(menu => Auth.hasAnyRoles(menu.authorize))
            }
        },
        methods: {}
    };
</script>

<style scoped lang="scss">
    .lefter-wrapper {
        width: 170px;
        transition: width 0.5s;

        .expander {
            text-align: right;
            cursor: pointer;
            position: relative;

            img {
                height: 40px;
                position: relative;
                top: 5px;
                left: -5px;
            }
        }

        &.close {
            width: 50px;
        }
    }
</style>
