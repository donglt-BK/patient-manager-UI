const currentUserKey = "mas-current-user";

function getUserRoles() {
    let currentUser = JSON.parse(localStorage.getItem(currentUserKey));
    let roles = [];
    if (currentUser) {
        roles.push(currentUser.role);
    }
    return roles;
}

let Auth = {
    setCurrentUser(currentUser) {
        localStorage.setItem(currentUserKey, JSON.stringify(currentUser));
        return Auth.getCurrentUser();
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
            hasAnyRoles: Auth.hasAnyRoles,
        };
    },
    isAuthenticated() {
        return getCurrentUser() !== undefined && getCurrentUser() != null;
    },
    hasAnyRoles(authorities) {
        if (!isAuthenticated()) {
            return false;
        }
        let roles = [getUserRoles()];

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


