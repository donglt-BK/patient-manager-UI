import Roles from "../security/Roles";
import Management from "../views/manager/Management";
import Pages from "./Pages";
import Schedule from "../views/schedule/Schedule";

let ManagerViews = [
    {
        ...Pages.management,
        component: Management,
        meta: {
            title: "Hospital Management",
        },
    },
    {
        ...Pages.schedule,
        component: Schedule,
        meta: {
            title: "Appointment schedule",
        },
    },
];
ManagerViews.forEach(view => view.meta.authorities = [Roles.DEPARTMENT_MANAGER]);
export default ManagerViews;
