import Roles from "../security/Roles";
import Manager from "../views/manager/Manager";
import Pages from "./Pages";

let ManagerViews = [
    {
        ...Pages.management,
        component: Manager,
        meta: {
            title: "Hospital Management",
        },
    }
];
ManagerViews.forEach(view => view.meta.authorities = [Roles.DEPARTMENT_MANAGER]);
export default ManagerViews;
