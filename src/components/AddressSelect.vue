<template>
    <div class="wrapper">
        <div>Address</div>
        <el-select v-model="country" @change="getCity">
            <el-option v-for="c in countries" :label="c.name" :value="c.id"></el-option>
        </el-select>

        <el-select v-model="city" @change="getDistrict" :disabled="country === ''">
            <el-option v-for="c in cities" :label="c.name" :value="c.id"></el-option>
        </el-select>

        <el-select v-model="district" @change="getBlock" :disabled="city === ''">
            <el-option v-for="d in districts" :label="d.name" :value="d.id"></el-option>
        </el-select>

        <el-select v-model="block" :disabled="district===''">
            <el-option v-for="b in blocks" :label="b.name" :value="b.id"></el-option>
        </el-select>
    </div>
</template>

<script>

    import AddressApi from "../api/AddressApi";

    export default {
        name: "AddressSelect",
        data() {
            return {
                city: '',
                country: '',
                district: '',
                block: '',
                cities: [],
                countries: [],
                districts: [],
                blocks: [],
                address: ""
            }
        },
        methods: {
            getCountry() {
                AddressApi.getCountry().then(res => {
                    this.countries = res;
                })
            },
            getCity(address) {
                this.city = '';
                this.district = '';
                this.block = '';
                AddressApi.getCity(this.country).then(res => {
                    this.cities = res;
                    console.log(address.cityId);
                    if (address.cityId) {
                        this.city = address.cityId;
                        this.getDistrict(address);
                    }
                })
            },
            getDistrict(address) {
                this.district = '';
                this.block = '';
                AddressApi.getDistrict(this.city).then(res => {
                    this.districts = res;

                    if (address.districtId) {
                        this.district = address.districtId;
                        this.getBlock(address);
                    }
                })
            },
            getBlock(address) {
                this.block = '';
                AddressApi.getBlock(this.district).then(res => {
                    this.blocks = res;
                    if (address.blockId) {
                        this.block = address.blockId;
                    }
                })
            },
            async load(address = {
                cityId: "",
                countryId: "",
                districtId: "",
                blockId: ""
            }) {
                this.country = address.countryId;
                this.getCity(address);
            },
            getAddress() {
                return {
                    cityId: this.city,
                    countryId: this.country,
                    districtId: this.district,
                    blockId: this.block,
                }
            },
            reset() {
                this.city = '';
                this.country = '';
                this.district = '';
                this.block = '';
                this.cities = [];
                this.countries = [];
                this.districts = [];
                this.blocks = [];
                this.getCountry();
            }
        },
        mounted() {
            this.reset();
        }
    }
</script>

<style scoped lang="scss">
    .wrapper {
        > * {
            padding-right: 10px;
        }
    }
</style>