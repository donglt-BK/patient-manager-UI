import SweetAlert from "@/service/sweet-alert.service";
import i18n from '@/i18n/index';
import AlertService from '@/service/alert.service';

export default {
    open(deleteFn, onSuccess, onFail, showAlert = true) {

        const title = i18n.t('common.deleteDialog.title');
        const msg = i18n.t('common.deleteDialog.message');
        const ok = i18n.t('common.confirmBtn');
        const cancel = i18n.t('common.cancelBtn');
        const success = i18n.t('common.deleteDialog.successMessage');
        const fail = i18n.t('common.serverErrorMessage');

        SweetAlert.confirmDelete(title, msg, preConfirm, ok, cancel);

        async function preConfirm() {
            try {
                await deleteFn();
                if (showAlert)
                    AlertService.success(success);
                if (onSuccess) {
                    onSuccess();
                }
            } catch (e) {
                if (showAlert)
                    AlertService.error(fail);
                if (onFail) {
                    onFail(e);
                }
            }
        }
    },
    openCancelDialog(cancelFn, onSuccess, onFail, showAlert = true) {

        const title = i18n.t('common.cancelDialog.title');
        const msg = i18n.t('common.cancelDialog.message');
        const ok = i18n.t('common.confirmBtn');
        const cancel = i18n.t('common.cancelBtn');
        const success = i18n.t('common.cancelDialog.successMessage');
        const fail = i18n.t('common.serverErrorMessage');

        SweetAlert.confirmDelete(title, msg, preConfirm, ok, cancel);

        async function preConfirm() {
            try {
                await cancelFn();
                if (showAlert)
                    AlertService.success(success);
                if (onSuccess) {
                    onSuccess();
                }
            } catch (e) {
                if (showAlert)
                    AlertService.error(fail);
                if (onFail) {
                    onFail(e);
                }
            }
        }
    },
    openCustomDialog(cancelFn,
                     {
                         title = i18n.t('common.deleteDialog.title'),
                         msg = i18n.t('common.deleteDialog.message'),
                         ok = i18n.t('common.confirmBtn'),
                         cancel = i18n.t('common.cancelBtn'),
                         success = i18n.t('common.deleteDialog.successMessage'),
                         fail = i18n.t('common.serverErrorMessage')
                     }, onSuccess, onFail, showAlert = true) {
        SweetAlert.confirmDelete(title, msg, preConfirm, ok, cancel);

        async function preConfirm() {
            try {
                await cancelFn();
                if (showAlert)
                    AlertService.success(success);
                if (onSuccess) {
                    onSuccess();
                }
            } catch (e) {
                if (showAlert)
                    AlertService.error(fail);
                if (onFail) {
                    console.log(e);
                    onFail(e);
                }
            }
        }
    }

}