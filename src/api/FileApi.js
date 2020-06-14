import {Request as request} from './Request';

export default {
    upload(file) {
        let formData = new FormData();
        formData.append('file', file);
        return request({
            url: "/file/upload",
            method: "POST",
            data: formData,
        });
    },
    getDepartmentFiles(departmentId) {
        return request({
            url: "/file/department?departmentId=" + departmentId,
            method: "GET"
        });
    },
    getHospitalFiles(hospitalId) {
        return request({
            url: "/file/hospital?hospitalId=" + hospitalId,
            method: "GET"
        });
    }
};
