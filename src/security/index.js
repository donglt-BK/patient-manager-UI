import Router from '@/router/Router';
import Auth from '@/security/Authentication';
import Pages from '@/router/Pages';

let enableSecurity = process.env.VUE_APP_ENABLE_SECURITY === 'true';

if (enableSecurity) {
    Router.beforeEach((to, from, next) => {
        let needAuthoritiesToViewPage = to.meta && to.meta.authorities && to.meta.authorities.length > 0;
        console.log("needAuthoritiesToViewPage ", needAuthoritiesToViewPage)
        if (needAuthoritiesToViewPage) {
            if (Auth.isAuthenticated()) {
                console.log("authorities ", to.meta.authorities)
                if (Auth.hasAnyRoles(to.meta.authorities)) {
                    next();
                } else {
                    next(Pages.notFound.path);
                }
            } else {
                next(Pages.login.path);
            }

        } else {
            if (Auth.isAuthenticated() && to.path === Pages.login.path) {
                next(Pages.home.path);
            }
            next();

        }
    });
} else {
    console.log("Disable security");
}
