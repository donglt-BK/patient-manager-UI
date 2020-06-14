import {Request as request} from './Request';
import Util from "../util";

const base = "/manage";

export default {
    listHospital(param) {
        return request({
            url: base + "/hospital/list" + Util.createParam(param),
            method: "GET"
        });
    },
    detailHospital(id) {
        return request({
            url: base + "/hospital/detail?id=" + id,
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
            url: base + "/hospital/delete?id=" + id,
            method: "POST"
        });
    },
    listDepartment(param) {
        return request({
            url: base + "/department/list" + Util.createParam(param),
            method: "GET",
        });
    },
    detailDepartment(id) {
        return request({
            url: base + "/department/detail?id=" + id,
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
    },
    deleteDepartment(hospitalId, departmentId) {
        return request({
            url: base + "/department/delete?hospitalId=" + hospitalId + "&departmentId=" + departmentId,
            method: "POST"
        });
    },

    listDoctor(param) {
        return request({
            url: base + "/doctor/list" + Util.createParam(param),
            method: "GET"
        });
    },
    detailDoctor(id) {
        return request({
            url: base + "/doctor/detail?id=" + id,
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
        console.log(data)
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
            url: base + "/doctor/delete?departmentId=" + departmentId + "&doctorId=" + doctorId,
            method: "POST"
        });
    },
};
