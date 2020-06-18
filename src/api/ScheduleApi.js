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
    listBook(param) {
        return request({
            url: base + "/listBook" + Util.createParam(param),
            method: "GET",
        });
    },
    toggle({date, shift, isClosed, departmentId}) {
        let formData = new FormData();
        formData.append("date", date);
        formData.append("shift", shift);
        formData.append("isClosed", isClosed);
        formData.append("departmentId", departmentId);

        return request({
            url: base + "/toggle",
            method: "POST",
            data: formData,
        });
    },
    create({date, shift, isClosed, limit, departmentId}) {
        let formData = new FormData();
        formData.append("date", date);
        formData.append("shift", shift);
        formData.append("limit", limit);
        formData.append("isClosed", isClosed);
        formData.append("departmentId", departmentId);

        return request({
            url: base + "/create",
            method: "POST",
            data: formData,
        });
    },
};
