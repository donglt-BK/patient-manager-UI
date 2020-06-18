import {Request as request} from './Request';

export default {
    getHospitalFiles(hospitalId) {
        return request({
            url: "/file/hospital?hospitalId=" + hospitalId,
            method: "GET"
        });
    },
    addHospitalFile(hospitalId, file) {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('hospitalId', hospitalId);
        return request({
            url: "/file/hospital/add",
            method: "POST",
            data: formData,
        });
    },
    deleteHospitalFile(hospitalId, file) {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('hospitalId', hospitalId);
        return request({
            url: "/file/hospital/delete",
            method: "POST",
            data: formData,
        });
    },
};
