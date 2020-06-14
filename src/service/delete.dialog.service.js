import SweetAlert from "./sweet-alert.service";

export default {
    open(deleteFn, {
        title = "Delete dialog",
        msg = "Do you want to delete this?",
        ok = "Confirm",
        cancel = "Cancel",
    }) {
        SweetAlert.confirmDelete(title, msg, deleteFn, ok, cancel);
    },
}