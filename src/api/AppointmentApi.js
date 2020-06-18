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
    myAppointment(param) {
        return request({
            url: base + "/myAppointment" + Util.createParam(param),
            method: "GET",
        });
    },
    book(scheduleId) {
        let formData = new FormData();
        formData.append('scheduleId', scheduleId);
        return request({
            url: base + "/book",
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
