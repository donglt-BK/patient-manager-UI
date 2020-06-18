import {Notification} from 'element-ui';

let defaultDuration = 3000; //ms
let AlertService = (function () {
    let disableAlert = false;
    function setDisabled(bool) {
        console.log("Disable Alert Service: " + bool);
        disableAlert = bool;
    }
    return {
        setDisabled: setDisabled,
        show(type, title, message, ms) {
            if (!message || message === '') return;
            if (disableAlert) return;
            Notification({
                type: type,
                title: title,
                message: message,
                duration: ms ? ms : defaultDuration,
            });
        },
        success(message, ms) {
            if (!message || message === '') return;
            if (disableAlert) return;
            Notification.success({
                message: message,
                duration: ms ? ms : defaultDuration,
            });
        },
        error(message, ms) {
            if (!message || message === '') return;
            if (disableAlert) return;
            Notification.error({
                message: message,
                duration: ms ? ms : defaultDuration,
            });
        },
        warning(message, ms) {
            if (!message || message === '') return;
            if (disableAlert) return;
            Notification.warning({
                message: message,
                duration: ms ? ms : defaultDuration,
            });
        },
        info(message, ms) {
            if (!message || message === '') return;
            if (disableAlert) return;
            Notification.info({
                message: message,
                duration: ms ? ms : defaultDuration,
            });
        }
    };
})();
export default AlertService;
