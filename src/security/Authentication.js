import Roles from "./Roles";
const currentUserKey = "mas-current-user";

function getUserRoles() {
    let currentUser = JSON.parse(localStorage.getItem(currentUserKey));
    if (currentUser) {
        return currentUser.roles;
    }
    return null;
}

let Auth = {
    setCurrentUser(data) {
        console.log(data);
        if (data.systemAdmin) data.roles = Roles.ALL;
        else {
            data.roles = [Roles.PATIENT];
            if (data.doctorIds.length > 0) data.roles.push(Roles.DOCTOR);
            if (data.manageDepartmentIds.length > 0) data.roles.push(Roles.DEPARTMENT_MANAGER);
            if (data.manageHospitalIds.length > 0) data.roles.push(Roles.HOSPITAL_MANAGER);
        }
        localStorage.setItem(currentUserKey, JSON.stringify(data));
        return this.getCurrentUser();
    },
    getCurrentUser() {
        if (!localStorage.getItem(currentUserKey)) {
            return null;
        }
        return {
            ...JSON.parse(localStorage.getItem(currentUserKey)),
            hasRole: function (checkRole) {
                return this.role === checkRole;
            },
            hasAnyRoles: this.hasAnyRoles,
        };
    },
    isAuthenticated() {
        return this.getCurrentUser() !== undefined && this.getCurrentUser() != null;
    },
    hasAnyRoles(authorities) {
        if (!this.isAuthenticated()) {
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
    },
    logout() {
        localStorage.removeItem(currentUserKey);
    }
};

export default Auth;


