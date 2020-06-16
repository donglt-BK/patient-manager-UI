import Roles from "../security/Roles";
import Management from "../views/manager/Management";
import Pages from "./Pages";

let ManagerViews = [
    {
        ...Pages.management,
        component: Management,
        meta: {
            title: "Hospital Management",
        },
    }
];
ManagerViews.forEach(view => view.meta.authorities = [Roles.DEPARTMENT_MANAGER]);
export default ManagerViews;
