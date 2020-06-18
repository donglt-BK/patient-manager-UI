import Vue from 'vue'
import Router from 'vue-router'
import Layout from "../layouts/Layout";
import Login from "../views/login/Login";
import Error from "../views/error/Error";
import Pages from "./Pages";
import PatientViews from "./PatientViews";
import ManagerViews from "./ManagerViews";
import Register from "../views/login/Register";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            component: Layout,
            children: [
                ...PatientViews,
                ...ManagerViews
            ]
        }, {
            ...Pages.register,
            component: Register,
            meta: {
                title: "Register"
            }
        }, {
            ...Pages.login,
            component: Login,
            meta: {
                title: "Login Page"
            }
        }, {
            ...Pages.notFound,
            component: Error,
            meta: {
                title: "Not found",
                error404: true,
            }
        },
    ]
});
router.afterEach((to, from) => {
    document.title = to.meta.title;
});
export default router;
