import Roles from "../../security/Roles";
import Pages from "../../router/Pages";

const menuList = {
    Profile: {
        name: "Your Profile",
        image: "",
        description: "",
        path: Pages.profile.path,
        authorize: Roles.ALL
    },
    Records: {
        name: "Records",
        image: "",
        description: "",
        path: "",
        authorize: Roles.ALL
    },
    Appointment: {
        name: "Appointment",
        image: "",
        description: "",
        path: "",
        authorize: Roles.ALL
    },
    Working: {
        name: "Working",
        image: "",
        description: "",
        path: "",
        authorize: [Roles.DOCTOR]
    },
    HospitalManagement: {
        name: "Hospital Management",
        image: "",
        description: "",
        path: "",
        authorize: [Roles.HOSPITAL_MANAGER, Roles.SYSTEM_ADMIN]
    },
    DepartmentManagement: {
        name: "Department Management",
        image: "",
        description: "",
        path: "",
        authorize: [Roles.DEPARTMENT_MANAGER, Roles.HOSPITAL_MANAGER, Roles.SYSTEM_ADMIN]
    },
    Schedule: {
        name: "Schedule",
        image: "",
        description: "",
        path: "",
        authorize: [Roles.DOCTOR, Roles.DEPARTMENT_MANAGER, Roles.HOSPITAL_MANAGER, Roles.SYSTEM_ADMIN]
    }
}
export default {
    ...menuList,
    ALL: Object.values(menuList)
}