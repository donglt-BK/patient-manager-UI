import Roles from "./Roles";

const currentUserKey = "mas-current-user";

function getUserRoles() {
    let currentUser = JSON.parse(localStorage.getItem(currentUserKey));
    if (currentUser) {
        return currentUser.roles;
    }
    return null;
}

function isAuthenticated() {
    return getCurrentUser() !== undefined && getCurrentUser() != null;
}

function hasAnyRoles(authorities) {
    if (!isAuthenticated()) {
        return false;
    }
    let roles = getUserRoles();

    if (!roles || roles.length === 0) {
        return false;
    }

    for (let i = 0; i < authorities.length; i++) {
        let valid = roles.some(role => role === authorities[i]);
        if (valid) {
            return true;
        }
    }
    return false;
}

function getCurrentUser() {
    if (!localStorage.getItem(currentUserKey)) {
        return null;
    }
    return {
        ...JSON.parse(localStorage.getItem(currentUserKey)),
        hasAnyRoles: hasAnyRoles,
    };
}

let Auth = {
    setCurrentUser(data) {
        console.log(data);
        if (data.systemAdmin) {
            data.roles = [Roles.PATIENT, Roles.SYSTEM_ADMIN, Roles.HOSPITAL_MANAGER, Roles.DEPARTMENT_MANAGER];
        } else {
            data.roles = [Roles.PATIENT];
            if (data.doctorIds.length > 0) data.roles.push(Roles.DOCTOR);
            if (data.manageDepartmentIds.length > 0) data.roles.push(Roles.DEPARTMENT_MANAGER);
            if (data.manageHospitalIds.length > 0) data.roles.push(Roles.HOSPITAL_MANAGER);
        }
        localStorage.setItem(currentUserKey, JSON.stringify(data));
        return getCurrentUser();
    },
    getCurrentUser: getCurrentUser,
    isAuthenticated: isAuthenticated,
    hasAnyRoles: hasAnyRoles,
    logout() {
        localStorage.removeItem(currentUserKey);
    }
};

export default Auth;


