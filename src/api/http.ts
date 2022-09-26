import axios from 'axios';
axios.defaults.timeout = 5000;
axios.defaults.baseURL = "http://localhost:3001";

// axios.interceptors.response.use(
//     response => {
//         if(response.status == 200){
//             return Promise.resolve(response);
//         }else{
//             return Promise.reject(response);
//         }
//     },
//     error => {
//         if(error.response.status){
//             switch (error.response.status) {
//                 case 401:  //未登录
//                     break;
//                 case 404:  //没找到地址
//                     break;
//             }
//             return Promise.reject(error.response);
//         }
//     }
// );

export function get(url:any, params = {}) {
    return new Promise((resolve,reject) => {
        axios.get(url,{params:params})
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
    });
}

export function post(url:any, data = {}) {
    return new Promise((resolve,reject) => {
        axios.post(url,data)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
    });
}
