import i18n from '@/i18n/index';

const SweetAlert = {
    info(content){
        return Swal.fire({
            text: content
        });
    },
    success(title, message, confirmBtnText, cancellable) {
        return Swal.fire({
            title: title,
            type: 'success',
            text: message,
            showCancelButton: cancellable ? cancellable : false,
            confirmButtonText: confirmBtnText ? confirmBtnText : 'OK'
        });
    },
    error(title, message, confirmBtnText, cancellable) {
        return Swal.fire({
            title: title,
            text: message,
            type: 'error',
            showCancelButton: cancellable ? cancellable : false,
            confirmButtonText: confirmBtnText ? confirmBtnText : 'OK'
        });
    },
    confirmDelete(title, message, preConfirm, ok, cancel) {
        /* callback is handle function when click confirm or cancel action */
        return Swal.fire({
            title: title ? title : 'Are you sure?',
            text: message ? message : "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText:ok ? ok : 'Confirm',
            cancelButtonText: cancel ? cancel : 'Cancel!',
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: preConfirm
        });
    },
    confirm(message, preConfirm) {
        return Swal.fire({
            title: "",
            text: message ? message : "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: i18n.t('common.confirmBtn'),
            cancelButtonText: i18n.t('common.cancelBtn'),
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: preConfirm
        });
    }
};

import Swal from "sweetalert2";

export default SweetAlert;
