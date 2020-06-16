<template>
    <div class="lefter-wrapper" v-bind:class="{close: !expand}">
        <div class="expander">
            <img :src="require('../../assets/images/icons/menu.png')" alt="expand" @click="onExpandClick">
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
                lefterItems: LefterItems.ALL.filter(menu => this.$auth.hasAnyRoles(menu.authorize))
            }
        },
        methods: {
            onExpandClick() {
                this.expand = !this.expand;
                this.$emit("onExpandClick", this.expand);
            }
        }
    };
</script>

<style scoped lang="scss">
    .lefter-wrapper {
        width: 170px;
        transition: width 0.5s;
        position: fixed;
        z-index: 1000;

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
