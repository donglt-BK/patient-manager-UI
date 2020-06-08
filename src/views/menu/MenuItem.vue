<template>
    <div @click="                $router.push({path: data.path})">
        <p class="name">{{data.name}}</p>
        <img :src="data.image"/>
        <p class="description">{{data.description}}</p>
    </div>
</template>

<script>
    export default {
        name: "MenuItem",
        props: ["data"]
    }
</script>

<style scoped>

</style>