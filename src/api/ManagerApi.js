import {Request as request} from './Request';
import Util from "../util";
import Auth from "../security/Authentication";

const base = "/manage";

export default {
    listManageHospital() {
        return request({
            url: base + "/hospital/listIn",
            method: "GET"
        });
    },
    listManageDepartment(hospitalId) {
        return request({
            url: base + "/department/listIn?hospitalId=" + hospitalId,
            method: "GET"
        });
    },
    listAllDoctor(departmentId) {
        return request({
            url: base + "/doctor/findAll?departmentId=" + departmentId,
            method: "GET"
        });
    },
    listHospital(param) {
        return request({
            url: base + "/hospital/list" + Util.createParam(param),
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
    addHospitalManager({hospitalId, managerId}) {
        let formData = new FormData();
        formData.append("hospitalId", hospitalId);
        formData.append("managerId", managerId);

        return request({
            url: base + "/hospital/addManager",
            method: "POST",
            data: formData,
        });
    },
    removeHospitalManager({hospitalId, managerId}) {
        let formData = new FormData();
        formData.append("hospitalId", hospitalId);
        formData.append("managerId", managerId);

        return request({
            url: base + "/hospital/removeManager",
            method: "POST",
            data: formData,
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
    addDepartmentManager({departmentId, managerId}) {
        let formData = new FormData();
        formData.append("departmentId", departmentId);
        formData.append("managerId", managerId);

        return request({
            url: base + "/department/addManager",
            method: "POST",
            data: formData,
        });
    },
    removeDepartmentManager({departmentId, managerId}) {
        let formData = new FormData();
        formData.append("departmentId", departmentId);
        formData.append("managerId", managerId);

        return request({
            url: base + "/department/removeManager",
            method: "POST",
            data: formData,
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
    getAllDoctorId(departmentId) {
        return request({
            url: base + "/doctor/getAllDoctorId?departmentId=" + departmentId,
            method: "GET"
        });
    },
    addDoctor({departmentId, userId}) {
        let formData = new FormData();
        formData.append("departmentId", departmentId);
        formData.append("userId", userId);

        return request({
            url: base + "/doctor/add",
            method: "POST",
            data: formData,
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
