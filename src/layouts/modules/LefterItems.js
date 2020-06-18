import Roles from "../../security/Roles";
import Pages from "../../router/Pages";

const lefterItems = {
    Profile: {
        name: "Your Profile",
        image: require("../../assets/images/icons/profile.png"),
        path: Pages.profile.path,
        authorize: Roles.ALL
    },
    Appointment: {
        name: "Appointment",
        image: require("../../assets/images/icons/appointment.png"),
        path: Pages.appointment.path,
        authorize: Roles.ALL
    },
    Schedule: {
        name: "Schedule Management",
        isLongName: true,
        image: require("../../assets/images/icons/schedule.png"),
        path: Pages.schedule.path,
        authorize: [Roles.DEPARTMENT_MANAGER, Roles.HOSPITAL_MANAGER, Roles.SYSTEM_ADMIN]
    },
    HospitalManagement: {
        name: "Hospital Management",
        isLongName: true,
        image: require("../../assets/images/icons/manage.png"),
        path: Pages.management.path,
        authorize: [Roles.DEPARTMENT_MANAGER, Roles.HOSPITAL_MANAGER, Roles.SYSTEM_ADMIN]
    },
}
export default {
    ...lefterItems,
    ALL: Object.values(lefterItems)
}