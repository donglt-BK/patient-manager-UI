import {Request as request} from './Request';

export default {
    getCountry() {
        return request({
            url: "/address/country",
            method: "GET"
        });
    },

    getCity(countryId) {
        return request({
            url: "/address/city?countryId=" + countryId,
            method: "GET"
        });
    },

    getDistrict(cityId) {
        return request({
            url: "/address/district?cityId=" + cityId,
            method: "GET"
        });
    },

    getBlock(districtId) {
        return request({
            url: "/address/block?districtId=" + districtId,
            method: "GET"
        });
    },
};
