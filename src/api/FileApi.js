import {Request as request} from './Request';

export default {
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
    },
    addDepartmentFile(departmentId, file) {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('departmentId', departmentId);
        return request({
            url: "/file/department/add",
            method: "POST",
            data: formData,
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
    deleteDepartmentFile(departmentId, file) {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('departmentId', departmentId);
        return request({
            url: "/file/department/delete",
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
