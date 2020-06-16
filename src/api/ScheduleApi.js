import {Request as request} from './Request';
import Util from '../util'
const base = "/schedule";

export default {
    list(param) {
        return request({
            url: base + "/list" + Util.createParam(param),
            method: "GET",
        });
    },
    create({date, shift, scheduleLimit, doctorLimit, departmentId}) {
        let formData = new FormData();
        formData.append("date", date);
        formData.append("shift", shift);
        formData.append("scheduleLimit", scheduleLimit);
        formData.append("doctorLimit", doctorLimit);
        formData.append("departmentId", departmentId);

        return request({
            url: base + "/create",
            method: "POST",
            data: formData,
        });
    },
    assign(date, shift, scheduleLimit, doctorLimit, doctorId) {
        let formData = new FormData();
        formData.append("date", date);
        formData.append("shift", shift);
        formData.append("scheduleLimit", scheduleLimit);
        formData.append("doctorLimit", doctorLimit);
        formData.append("doctorId", doctorId);

        return request({
            url: base + "/assign",
            method: "POST",
            data: formData,
        });
    },

    deAssign(date, shift, doctorId) {
        let formData = new FormData();
        formData.append("date", date);
        formData.append("shift", shift);
        formData.append("doctorId", doctorId);

        return request({
            url: base + "/deAssign",
            method: "POST",
            data: formData,
        });
    },

    mySchedule(departmentId) {
        return request({
            url: base + "/mySchedule?departmentId=" + departmentId,
            method: "GET",
        });
    },

    requestChange(date, shift, scheduleId) {
        let formData = new FormData();
        formData.append("date", date);
        formData.append("shift", shift);
        formData.append("scheduleId", doctorId);

        return request({
            url: base + "/requestChange",
            method: "POST",
            data: formData,
        });
    },

    myChangeRequest(departmentId, {page, size}) {
        let formData = new FormData();
        formData.append("departmentId", departmentId);
        formData.append("page", page ? page : 1);
        formData.append("size", size ? size : 10);

        return request({
            url: base + "/myChangeRequest/list",
            method: "GET",
            data: formData,
        });
    },

    listChangeRequest(departmentId, {page, size}) {
        let formData = new FormData();
        formData.append("departmentId", departmentId);
        formData.append("page", page ? page : 1);
        formData.append("size", size ? size : 10);

        return request({
            url: base + "/changeRequest/list",
            method: "GET",
            data: formData,
        });
    },

    approve(changeRequestId, isApprove) {
        let formData = new FormData();
        formData.append("changeRequestId", changeRequestId);
        formData.append("isApprove", isApprove);

        return request({
            url: base + "/changeRequest/resolve",
            method: "POST",
            data: formData,
        });
    },

};
