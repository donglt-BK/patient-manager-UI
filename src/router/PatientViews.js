import Pages from "@/router/Pages";
import Profile from "../views/profile/Profile";
import Roles from "../security/Roles";
import Home from "../views/Home";

let PatientViews = [
    {
        ...Pages.profile,
        component: Profile,
        meta: {
            title: "Profile",
        },
    }, {
        ...Pages.home,
        component: Home,
        meta: {
            title: "Home",
        },
    },
];
PatientViews.forEach(view => view.meta.authorities = [Roles.PATIENT]);
export default PatientViews;
