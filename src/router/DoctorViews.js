import Roles from "../security/Roles";
import Pages from "./Pages";
import Schedule from "../views/schedule/Schedule";

let DoctorViews = [
    {
        ...Pages.schedule,
        component: Schedule,
        meta: {
            title: "Working Schedule",
            authorities: [Roles.DEPARTMENT_MANAGER, Roles.HOSPITAL_MANAGER, Roles.SYSTEM_ADMIN]
        },
    }
];
DoctorViews.forEach(view => {
    if (view.meta.authorities) {
        view.meta.authorities.push(Roles.DOCTOR);
    } else {
        view.meta.authorities = [Roles.DOCTOR];
    }
});
export default DoctorViews;
