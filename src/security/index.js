import Router from '@/router/Router';
import Auth from '@/security/Authentication';
import Pages from '@/router/Pages';

let enableSecurity = process.env.VUE_APP_ENABLE_SECURITY == 'true';

if (enableSecurity) {
    Router.beforeEach((to, from, next) => {
        let needAuthoritiesToViewPage = to.meta && to.meta.authorities && to.meta.authorities.length > 0;

        if (needAuthoritiesToViewPage) {
            console.log("Check authority page "+to.fullPath);
            if (Auth.hasAnyRoles(to.meta.authorities)) {
                /* has permission to access page */
                next();
            } else {
                if (!Auth.isAuthenticated()) {
                    next(Pages.login.path);
                } else {
                    next(Pages.forbidden.path);
                }
            }
        } else {

            if (Auth.isAuthenticated() && to.path == Pages.login.path)
                next(Pages.redirect.path);

            // no authorities, so just proceed
            next();

        }
    });
} else {
    console.log("Disable security");
}
