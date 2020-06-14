<template>
    <div @click="$router.push({path: itemData.path})" class="lefter-item">
        <img :src="itemData.image" :alt="itemData.name"/>
        <p v-bind:class="{'two-line': itemData.isLongName}">{{itemData.name}}</p>
        <span class="tooltip" v-bind:class="{'two-line': itemData.isLongName}">{{itemData.name}}</span>
    </div>
</template>

<script>
    export default {
        name: "LefterItem",
        props: {
            itemData: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    .lefter-item {
        height: 50px;
        padding: 2.5px;
        position: relative;
        cursor: pointer;

        img {
            height: 80%;
            position: relative;
            top: 10%;
            left: 5px;
        }

        p {
            margin: 0;
            position: absolute;
            top: calc(50% - 9px);
            left: 50px;
            width: 120px;
            white-space: nowrap;
            overflow: hidden;
            transition: width 0.5s;
            &.two-line {
                top: calc(50% - 18px);
                white-space: normal;
            }
        }

        .tooltip {
            display: none;
            width: 120px;
            background-color: black;
            color: #fff;
            text-align: center;
            padding: 5px 0;
            border-radius: 6px;

            position: absolute;
            z-index: 1;
            right: -125px;
            top: calc(50% - 14px);

            &.two-line {
                white-space: normal;
                top: calc(50% - 23px);
            }

            &::after {
                content: " ";
                position: absolute;
                top: 50%;
                right: 100%; /* To the left of the tooltip */
                margin-top: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: transparent black transparent transparent;
            }
        }
    }
</style>