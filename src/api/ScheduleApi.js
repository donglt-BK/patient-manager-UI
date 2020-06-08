import {Request as request} from './Request';

const base = "/schedule";

export default {
    list(start, end, departmentId) {
        let formData = new FormData();
        formData.append("start", start);
        formData.append("end", end);
        formData.append("departmentId", departmentId);

        return request({
            url: "/list",
            method: "GET",
            data: formData,
        });
    },
    assign(date, shift, doctorIds) {
        let formData = new FormData();
        formData.append("date", date);
        formData.append("shift", shift);
        formData.append("doctorIds", doctorIds.join("||"));

        return request({
            url: "/assign",
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
            url: "/deAssign",
            method: "POST",
            data: formData,
        });
    },

    mySchedule(departmentId) {
        return request({
            url: "/mySchedule?departmentId=" + departmentId,
            method: "GET",
        });
    },

    requestChange(date, shift, scheduleId) {
        let formData = new FormData();
        formData.append("date", date);
        formData.append("shift", shift);
        formData.append("scheduleId", doctorId);

        return request({
            url: "/requestChange",
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
            url: "/myChangeRequest/list",
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
            url: "/changeRequest/list",
            method: "GET",
            data: formData,
        });
    },

    approve(changeRequestId, isApprove) {
        let formData = new FormData();
        formData.append("changeRequestId", changeRequestId);
        formData.append("isApprove", isApprove);

        return request({
            url: "/changeRequest/resolve",
            method: "POST",
            data: formData,
        });
    },

};
