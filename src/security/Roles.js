const role = {
    SYSTEM_ADMIN: "ADMIN",
    HOSPITAL_MANAGER: "HPT_MNG",
    DEPARTMENT_MANAGER: "DPT_MNG",
    DOCTOR: "DOCTOR",
    PATIENT: "PATIENT",

}

export default {
    ...role,
    ALL: Object.values(role)
}