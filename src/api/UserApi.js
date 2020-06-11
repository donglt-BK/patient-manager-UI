import {Request as request} from './Request';

const  base = "/user";

export default {
    login(data) {
        let formData = new FormData();
        formData.append("username", data.username);
        formData.append("password", data.password);

        return request({
            url: "/login",
            method: "POST",
            data: formData,
        });
    },
    register() {
        let data = {
            username: "admin",
            password: "admin",
            name: "admin"
        }

        return request.post(base + "/register", data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    refresh() {
        return request({
            url: base + "/refresh",
            method: "GET"
        });
    },
    update(data) {
        return request.post(base + "/update", data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};
