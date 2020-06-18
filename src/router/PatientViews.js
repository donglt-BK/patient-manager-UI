import Pages from "./Pages";
import Profile from "../views/profile/Profile";
import Roles from "../security/Roles";
import Home from "../views/home/Home";
import AppointmentBook from "../views/appointment/AppointmentBook";
import AppointmentList from "../views/appointment/AppointmentList";

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
    }, {
        ...Pages.book,
        component: AppointmentBook,
        meta: {
            title: "Booking Appointment",
        },
    }, {
        ...Pages.appointment,
        component: AppointmentList,
        meta: {
            title: "Your Appointment",
        },
    },
];
PatientViews.forEach(view => view.meta.authorities = [Roles.PATIENT]);
export default PatientViews;
