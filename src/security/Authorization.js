import auth from '@/security/Authentication';
import pages from '@/router/Pages';

const SHOP_ADMIN = "SHOP_ADMIN";
const FACILITY_ADMIN = "FACILITY_ADMIN";
const SYSTEM_ADMIN = "SYSTEM_ADMIN";

const rules = new Map();
rules.set(pages.coupon.path, [FACILITY_ADMIN, SYSTEM_ADMIN]);
rules.set(pages.mallEvent.path, [FACILITY_ADMIN, SYSTEM_ADMIN]);
rules.set(pages.service.path, [FACILITY_ADMIN, SYSTEM_ADMIN]);
rules.set(pages.pageDescription.path, [SYSTEM_ADMIN]);


export default {
    hasPermissionToViewPage(pageUri) {
        const currentUser = auth.getCurrentUser();
        const requiredRoles = rules.get(pageUri);

    }
}