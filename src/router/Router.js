import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login.vue';
import Layout from "@/layouts/Layout";
import Pages from '@/router/Pages';
import RedirectComponent from '@/router/RedirectComponent';
import Error from "@/views/error/Error";
import Roles from "@/security/Roles";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            redirect: Pages.redirect.path,
            component: Layout,
            children: [
                {
                    path: Pages.redirect.path,
                    component: RedirectComponent,
                    meta: {
                        title: "Redirecting",
                        authorities: [Roles.SYSTEM_ADMIN,Roles.FACILITY_ADMIN,Roles.FACILITY_EMPLOYEE]
                    }
                },
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
        },
        {
            ...Pages.forbidden,
            component: Error,
            meta: {
                title: "Access denied",
                error403: true,
            }
        }
    ]
});
router.afterEach((to, from) => {
    document.title = to.meta.title;
});
export default router;
