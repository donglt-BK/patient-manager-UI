import moment from 'moment';

const utils = {
    deepCopy: (data) => JSON.parse(JSON.stringify(data)),
    exportCSV: (fileName, rawData, customContent) => {
        let csvContent;
        if (!customContent) {
            if (!rawData.length) return;
            csvContent = "data:text/csv;charset=utf-8,\uFEFF";
            rawData.forEach(function (row) {
                csvContent += row + ",\r\n";
            });
        } else {
            csvContent = customContent;
        }

        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.href = encodedUri;
        link.download = fileName ? fileName : "export.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
    isEmpty(value){
        return value == null || value == undefined || ( typeof value == "string" && value.trim() == "" );
    },
    formatDate(date,format){
        format = this.isEmpty(format) ? "YYYY/MM/DD" : format;
        return moment(date).format(format);
    },
    formatDateTime(dateTime){
        return moment(dateTime).format("YYYY/MM/DD HH:mm:ss");
    },
    createParam(query) {
        let param = '?';
        for(let obj in query) {
            param = `${param}${obj}=${query[obj]}&`;
        }
        return param.substring(0, param.length - 1);
    },
    updateListAppMenu(appMenus, appMenu) {
        let index = appMenus.map(menu => {return menu.code}).indexOf(appMenu.code);
        if (index > -1) {
            appMenus[index] = {...appMenu};
        } else {
            appMenus.push(appMenu);
        }
        return appMenus;
    },
    mapAppMenu(appMenus) {
        return appMenus.map((menu, index) => {
            return {
                code: menu.code,
                name: menu.name,
                showOnApp: menu.showOnApp,
                hiddenOnBottom: menu.hiddenOnBottom,
                sortOrder: index + 1
            }
        });
    },
    mapWebMenu(appMenus) {
        return appMenus.map((menu, index) => {
            return {
                code: menu.code,
                name: menu.name,
                showOnApp: menu.showOnApp,
                typeCode: menu.typeCode,
                sortOrder: index + 1
            }
        });
    },
    isUrlValid(userInput) {
        let regex = new RegExp("^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,10}(:[0-9]{1,5})?(\\/.*)?$");
        if(userInput.match(regex))
            return true;
        else
            return false;
    },

    // @author: Hoang Van Toan
    isPasswordValid(passwordInput){
        return passwordInput.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
    },

    isWebsiteUrl(input){
        return input.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);
    },
    buildFileUrl(url) {
        return process.env.VUE_APP_BACKEND_URL + "/file/get/" + url;
    }
};

export default utils;
