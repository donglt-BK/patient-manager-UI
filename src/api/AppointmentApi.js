import {Request as request} from './Request';
import Util from "../util";
const base = "/appointment";

export default {
    findHospital(param) {
        return request({
            url: base + "/find/hospital" + Util.createParam(param),
            method: "GET",
        });
    },
    findDepartment(param) {
        return request({
            url: base + "/find/department" + Util.createParam(param),
            method: "GET",
        });
    },
    findDoctor(departmentId, name, {page, size}) {
        let formData = new FormData();
        formData.append('departmentId', departmentId);
        formData.append('name', name);
        formData.append("page", page ? page : 1);
        formData.append("size", size ? size : 10);

        return request({
            url: base + "/find/doctor",
            method: "GET",
            data: formData,
        });
    },
    myAppointment({page, size}) {
        let formData = new FormData();
        formData.append("page", page ? page : 1);
        formData.append("size", size ? size : 10);

        return request({
            url: base + "/myAppointment",
            method: "GET",
            data: formData,
        });
    },
    doctorAppointment(departmentId, {page, size}) {
        let formData = new FormData();
        formData.append('departmentId', departmentId);
        formData.append("page", page ? page : 1);
        formData.append("size", size ? size : 10);

        return request({
            url: base + "/doctorAppointment",
            method: "GET",
            data: formData,
        });
    },
    departmentAppointment(departmentId, {page, size}) {
        let formData = new FormData();
        formData.append('departmentId', departmentId);
        formData.append("page", page ? page : 1);
        formData.append("size", size ? size : 10);

        return request({
            url: base + "/departmentAppointment",
            method: "GET",
            data: formData,
        });
    },
    book(scheduleId, doctorId) {
        let formData = new FormData();
        formData.append('scheduleId', scheduleId);
        if (doctorId) {
            formData.append("doctorId", doctorId);
        }

        return request({
            url: base + "/book",
            method: "POST",
            data: formData,
        });
    },
    receive(appointmentId) {
        let formData = new FormData();
        formData.append('appointmentId', appointmentId);

        return request({
            url: base + "/receive",
            method: "POST",
            data: formData,
        });
    },
    cancel(appointmentId) {
        let formData = new FormData();
        formData.append('appointmentId', appointmentId);

        return request({
            url: base + "/cancel",
            method: "POST",
            data: formData,
        });
    }
};
