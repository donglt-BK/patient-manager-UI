import {Request as request} from './Request';
import Util from "../util"

const base = "/user";

export default {
    login({username, password}) {
        let formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        return request({
            url: "/login",
            method: "POST",
            data: formData,
        });
    },
    register(data) {
        return request.post(base + "/register", data, {
            processData: false,
            contentType: false,
            headers: {
                "Content-Type": undefined
            }
        });
    },
    update(data) {
        return request.post(base + "/update", data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    find(param) {
        return request({
            url: base + "/find" + Util.createParam(param),
            method: "GET"
        });
    },
    refresh() {
        return request({
            url: base + "/refresh",
            method: "GET"
        });
    },
};
