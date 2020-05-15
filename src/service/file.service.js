import {Request as request} from "@/api/Request";

let baseUrl = "/api/v1/file"
let FileService = {
    uploadFile(payload) {
        return request.post(baseUrl + "/uploadFile", payload, {
            processData: false,
            contentType: false,
            headers: {
                "Content-Type": undefined
            }
        })
    },
    downloadFile(code, name, callback) {
        console.log(request);
        request.get(baseUrl + "/downloadFile", {
            params: {
                attachmentCode: code
            },
            responseType: 'blob'
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.download = name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            if (callback) callback();
        }).catch((error) => {
            if (callback) callback();
            console.log(error);
        });
    }
};

export default FileService;
