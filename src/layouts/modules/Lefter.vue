<template>
    <div class="lefter-wrapper gray" v-bind:class="{close: !expand}">
        <div class="expander" @click="onExpandClick">
            <img :src="require('../../assets/images/icons/menu.png')" alt="expand">
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
    @import "../../assets/styles/var";

    .lefter-wrapper {
        width: 170px;
        transition: width 0.5s;
        position: fixed;
        z-index: 1000;
        height: 100vh;

        > * {
            height: 60px;
            border-bottom: 1px solid $color-darkest-gray;

            &:hover {
                background-color: $color-darken-gray;
            }
        }

        .expander {
            text-align: right;
            cursor: pointer;
            position: relative;

            img {
                height: 30px;
                position: relative;
                top: 15px;
                left: -15px;
            }
        }

        &.close {
            width: 60px;
        }
    }
</style>
