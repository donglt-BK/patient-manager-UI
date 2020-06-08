import {Request as request} from './Request';

const base = "/manage";

export default {
    listHospital({page, size}) {
        let formData = new FormData();
        formData.append("page", page ? page : 1);
        formData.append("size", size ? size : 10);

        return request({
            url: "/hospital/list",
            method: "GET",
            data: formData,
        });
    },
    detailHospital(id) {
        return request({
            url: "/hospital/detail?id=" + id,
            method: "GET"
        });
    },
    addHospital(data) {
        return request.post(base + "/hospital/add", data, {
            processData: false,
            contentType: false,
            headers: {
                "Content-Type": undefined
            }
        });
    },
    updateHospital(data) {
        return request.post(base + "/hospital/update", data, {
            processData: false,
            contentType: false,
            headers: {
                "Content-Type": undefined
            }
        });
    },
    changeHospitalManager(data) {
        return request.post(base + "/hospital/changeManager", data, {
            processData: false,
            contentType: false,
            headers: {
                "Content-Type": undefined
            }
        });
    },
    deleteHospital(id) {
        return request({
            url: "/hospital/delete?id=" + id,
            method: "POST"
        });
    },
    listDepartment(hospitalId, {page, size}) {
        let formData = new FormData();
        formData.append("hospitalId", hospitalId);
        formData.append("page", page ? page : 1);
        formData.append("size", size ? size : 10);

        return request({
            url: "/department/list",
            method: "GET",
            data: formData,
        });
    },
    detailDepartment(id) {
        return request({
            url: "/department/detail?id=" + id,
            method: "GET"
        });
    },
    addDepartment(data) {
        return request.post(base + "/department/add", data, {
            processData: false,
            contentType: false,
            headers: {
                "Content-Type": undefined
            }
        });
    },
    updateDepartment(data) {
        return request.post(base + "/department/update", data, {
            processData: false,
            contentType: false,
            headers: {
                "Content-Type": undefined
            }
        });
    },
    changeDepartmentManager(data) {
        return request.post(base + "/department/changeManager", data, {
            processData: false,
            contentType: false,
            headers: {
                "Content-Type": undefined
            }
        });
    }, deleteDepartment(hospitalId, departmentId) {
        return request({
            url: "/department/delete?hospitalId=" + hospitalId + "&hospitalId=" + departmentId,
            method: "POST"
        });
    },

    listDoctor(departmentId, {page, size}) {
        let formData = new FormData();
        formData.append("departmentId", departmentId);
        formData.append("page", page ? page : 1);
        formData.append("size", size ? size : 10);

        return request({
            url: "/doctor/list",
            method: "GET",
            data: formData,
        });
    },
    detailDoctor(id) {
        return request({
            url: "/doctor/detail?id=" + id,
            method: "GET"
        });
    },
    addDoctor(data) {
        return request.post(base + "/doctor/add", data, {
            processData: false,
            contentType: false,
            headers: {
                "Content-Type": undefined
            }
        });
    },
    updateDoctor(data) {
        return request.post(base + "/doctor/update", data, {
            processData: false,
            contentType: false,
            headers: {
                "Content-Type": undefined
            }
        });
    },
    deleteDoctor(departmentId, doctorId) {
        return request({
            url: "/doctor/delete?departmentId=" + departmentId + "&departmentId=" + doctorId,
            method: "POST"
        });
    },
};
