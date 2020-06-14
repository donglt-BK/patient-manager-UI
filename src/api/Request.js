import axios from 'axios';
import auth from '@/security/Authentication';
import router from '@/router/Router';
import pages from '@/router/Pages';
import AlertService from "@/service/alert.service";

let createRequest = (baseURL) => {

    let timeout = 1000 * 60 * 5;
    const request = axios.create({
        baseURL: baseURL,
        timeout: timeout,
        withCredentials: true
    });

    request.interceptors.response.use(response => {
        return response.data;
    }, error => {

        /**
         * perform redirect to login page when server response with status 401 ( un authorization )
         *
         */
        if (error && error.response) {
            if (error.response.status == 401) {
                auth.logout(); // call logout to remove current user & token.
                router.push({path: pages.login.path});
                AlertService.setDisabled(true);
            } else if (error.response.status == 400) {
                AlertService.error(error.response.data);
            }
        }
        return Promise.reject(error);
    });

    request.interceptors.request.use(function (config) {

        return config;

    }, function (error) {
        return Promise.reject(error);
    });

    return request;
};

const Request = createRequest(process.env.VUE_APP_BACKEND_URL);

export {Request};
