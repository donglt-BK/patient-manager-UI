import Vue from 'vue';
import AlertService from './alert.service';
import DeleteDialogService from './delete.dialog.service';


Vue.prototype.$services = {
    alert: AlertService,
    deleteDialog: DeleteDialogService,
    scrollTop: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};



