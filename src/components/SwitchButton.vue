<template>
    <div style="display: inline-block">
        <toggle-button :value="value" :sync="true"
                       :color="{checked: switchBtnActiveColor, unchecked: switchBtnInActiveColor}"
                       :labels="{checked: text.on, unchecked: text.off }"
                       @change="onChange"
        />
    </div>
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
            text: {
                required: false,
                type: Object,
                default: {
                    on: 'ON',
                    off: 'OFF'
                }
            }
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
    /deep/ .v-switch-core {
        width: 70px !important;
    }
    /deep/ .vue-js-switch .v-switch-label.v-left {
        left: 13px !important;
    }

    /deep/ .vue-js-switch.toggled .v-switch-button {
        transform: translate3d(50px, 3px, 0px) !important;
    }

</style>
