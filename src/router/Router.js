import Vue from 'vue'
import Router from 'vue-router'
import Layout from "../layouts/Layout";
import Login from "../views/login/Login";
import Pages from './Pages';
import View from "./index";
import Error from "@/views/error/Error";
import Roles from "@/security/Roles";
import Menu from "../views/menu/Menu";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            redirect: Pages.home.path,
            component: Layout,
            children: [
                {
                    path: Pages.home.path,
                    component: Menu,
                    meta: {
                        title: "Redirecting",
                        authorities: [Roles.ALL]
                    }
                },
                ...View
            ]
        },
        {
            ...Pages.login,
            component: Login,
            meta: {
                title: "Login Page"
            }
        },
        {
            ...Pages.notFound,
            component: Error,
            meta: {
                title: "Not found",
                error404: true,
            }
        }
    ]
});
router.afterEach((to, from) => {
    document.title = to.meta.title;
});
export default router;
