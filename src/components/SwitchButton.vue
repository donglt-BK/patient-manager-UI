<template>
    <toggle-button :value="value" :sync="true"
                   :color="{checked: switchBtnActiveColor, unchecked: switchBtnInActiveColor}"
                   :labels="{checked: 'ON', unchecked: 'OFF' }"
                   @change="onChange"
    />
</template>

<script>
    /**
     * Properties:
     * value: true/false.
     * Event:
     * change: trigger when value changes. (emit value after change)
     */
    import {ToggleButton} from 'vue-js-toggle-button';

    export default {
        name: "SwitchButton",
        components: {ToggleButton},
        props: {
            value: {
                required: true,
                type: Boolean
            },
        },
        data() {
            return {
                switchBtnActiveColor: "rgb(98, 189, 98)",
                switchBtnInActiveColor: "rgb(232, 123, 29)"
            }
        },
        methods: {
            onChange(value) {
                this.$emit("change", value);
            }
        },
        watch: {
            'value': function (value) {
                console.log(" switch button change value: " + value);
            }
        }
    }
</script>

<style scoped>

</style>
