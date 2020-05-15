import Roles from "../../security/Roles";

const menuList = {
    Profile: {
        name: "Your Profile",
        image: "",
        description: "",
        page: "",
        authorize: Roles.ALL
    },
    Records: {
        name: "Your Profile",
        image: "",
        description: "",
        page: "",
        authorize: Roles.ALL
    },
    Appointment: {
        name: "Your Profile",
        image: "",
        description: "",
        page: "",
        authorize: Roles.ALL
    },
    Management: {
        name: "Your Profile",
        image: "",
        description: "",
        page: "",
        authorize: [Roles.DEPARTMENT_MANAGER, Roles.HOSPITAL_MANAGER, Roles.SYSTEM_ADMIN]
    },
    Schedule: {
        name: "Your Profile",
        image: "",
        description: "",
        page: "",
        authorize: [Roles.DOCTOR, Roles.DEPARTMENT_MANAGER, Roles.HOSPITAL_MANAGER, Roles.SYSTEM_ADMIN]
    }
}
export default {
    ...menuList,
    ALL: Object.values(menuList)
}