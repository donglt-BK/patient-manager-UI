<template>
    <div class="map-wrapper">
        <gmaps-map :options="mapOptions" ref="map">
            <gmaps-marker :options="makerOptions" @move="updatePosition" ref="maker"/>
        </gmaps-map>
    </div>
</template>

<script>
    import {gmapsMap, gmapsMarker} from 'x5-gmaps'

    export default {
        name: "GoogleMap",
        props: {
            makerName: {
                type: String,
                require: true
            }
        },
        components: {gmapsMap, gmapsMarker},
        watch: {
            makerName() {
                this.makerOptions.title = this.makerName;
            }
        },
        data() {
            return {
                mapOptions: {
                    center: {lat: 21.004807, lng: 105.845115},
                    zoom: 14,
                    fullscreenControl: false,
                    mapTypeControl: false,
                    rotateControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    zoomControl: false
                },
                makerOptions: {
                    draggable: true,
                    title: this.makerName,
                    position: {
                        lat: 21.004807,
                        lng: 105.845115
                    },
                },
                location: {
                    lat: 21.004807,
                    lng: 105.845115
                }
            }
        },
        methods: {
            load(latitude = 21.004807, longitude = 105.845115) {
                if (typeof(latitude) === "string") {
                    latitude = parseFloat(latitude);
                    longitude = parseFloat(longitude);
                }
                this.mapOptions.center = {
                    lat: latitude,
                    lng: longitude
                }
                this.makerOptions.position = {
                    lat: latitude,
                    lng: longitude
                };

                this.location = {
                    lat: latitude,
                    lng: longitude
                }

            },
            updatePosition({lat, lng}) {
                this.location.lat = lat;
                this.location.lng = lng;
            },
            getLocation() {
                return this.location;
            }
        }
    }
</script>

<style scoped>
    .map-wrapper {
        height: 300px;
        width: 300px;
    }
</style>