import {Request as request} from '@/api/Request';


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
    changePassword(changePwRequest) {
        return request({
            url: "/changePassword",
            method: "POST",
            data: changePwRequest
        });
    },
    isAuthenticated() {
        return request({
            url: "/isAuthenticated",
            method: "GET"
        });
    }
};
