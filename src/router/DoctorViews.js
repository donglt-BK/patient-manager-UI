import Roles from "../security/Roles";

let DoctorViews = [];
DoctorViews.forEach(view => view.meta.authorities = [Roles.DOCTOR]);
export default DoctorViews;
