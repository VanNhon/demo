import axios from 'axios';
import * as HTTP_CODE from 'http-status-codes'
import { message } from '../configs/common/message';
export const callAPI = (option) => {
    // add more config here - if need!

    //return promise
    return new Promise((resolve, reject) => {
        axios(option)
            .then(response => {
                const status = response.status;
                if (status === HTTP_CODE.OK ||
                    status === HTTP_CODE.CREATED ||
                    status === HTTP_CODE.DELETED) {
                    resolve(response.data);
                } else {
                    reject(message.message);
                }
            })
            .catch(error => {
                //console.error("Here I am 1");
                let err = {};
                if (error.response) {
                    //console.error("Here I am 2");
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    err.status = error.response.status
                    // console.log('data', err);
                    //console.error("Here I am 3");
                    //console.log('status', error.response.status);
                } else if (error.request) {
                    //console.error("Here I am 4");
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    err = error.request;
                    console.log(error.request);
                    //console.error("Here I am 5");
                } else {
                    //console.error("Here I am 6");
                    // Something happened in setting up the request that triggered an Error
                    err = error.message;
                    console.log('Error', error.message);
                    //console.error("Here I am 7");
                }
                reject(err);
            });
    });

}

export const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export default { callAPI, wait }