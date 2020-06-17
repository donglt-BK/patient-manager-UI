<template>
    <div class="map-wrapper">
        <gmaps-map :options="mapOptions" ref="map">
            <gmaps-marker :options="makerOptions" @move="updatePosition" ref="maker"/>
            <gmaps-marker v-if="showMyLocation" :options="myMakerOptions" ref="myMaker"/>
        </gmaps-map>
    </div>
</template>

<script>
    import {gmapsMap, gmapsMarker} from 'x5-gmaps'

    export default {
        name: "GoogleMap",
        props: {
            movable: {
                type: Boolean,
                default: true,
            },
            showMyLocation: {
                type: Boolean,
                default: false,
            },
            makerName: {
                type: String,
                required: true
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
                    mapTypeControl: false,
                    rotateControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    zoomControl: false
                },
                makerOptions: {
                    draggable: this.movable,
                    title: this.makerName,
                    position: {
                        lat: 21.004807,
                        lng: 105.845115
                    },
                },
                myMakerOptions: {
                    title: "You are here",
                    icon: require('../assets/images/icons/nav.png'),
                    position: {
                        lat: 21.004807,
                        lng: 105.845115
                    },
                },
                location: {
                    lat: 21.004807,
                    lng: 105.845115
                },
            }
        },
        methods: {
            getMyLocation() {
                if (navigator.geolocation) navigator.geolocation.getCurrentPosition((pos) => {
                    this.myMakerOptions.position = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }
                    this.mapOptions.center = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }
                })
                else this.$services.alert.error('Geolocation is not supported by this browser.')
            },
            load(latitude = 21.004807, longitude = 105.845115) {
                if (typeof (latitude) === "string") {
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

                if (this.showMyLocation)
                    this.getMyLocation()
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
        height: 100%;
        width: 100%;
    }
</style>