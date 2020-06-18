<template>
    <div class="wrapper">
        <InputLabel class='label' text="Address" :optional="true"/>
        <el-input class='field' v-model="address" placeholder="Specific Address"></el-input>

        <div style="margin-top: 5px">
            <el-select class='select' v-model="country" @change="getCity">
                <el-option v-for="c in countries" :label="c.name" :value="c.id"></el-option>
            </el-select>

            <el-select class='select' v-model="city" @change="getDistrict" :disabled="country === ''">
                <el-option v-for="c in cities" :label="c.name" :value="c.id"></el-option>
            </el-select>

            <el-select class='select' v-model="district" @change="getBlock" :disabled="city === ''">
                <el-option v-for="d in districts" :label="d.name" :value="d.id"></el-option>
            </el-select>

            <el-select class='select' v-model="block" :disabled="district===''">
                <el-option v-for="b in blocks" :label="b.name" :value="b.id"></el-option>
            </el-select>
        </div>
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
            async load(address = {countryId: ""}) {
                if (address.countryId !== 0) {
                    this.country = address.countryId;
                }
                this.address = address.specificAddress;
                if (this.country !== '') this.getCity(address);
            },
            getAddress() {
                return {
                    cityId: this.city,
                    countryId: this.country,
                    districtId: this.district,
                    blockId: this.block,
                    specificAddress: this.address
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

    .label {
        margin-top: 10px;
        width: 160px !important;
    }

    .field {
        width: calc(100% - 160px);
    }

    .wrapper {
        .select {
            padding-right: 10px;
            width: 25%;

            &:last-child {
                padding-right: 0;
            }
        }
    }
</style>