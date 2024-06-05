import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const BASEURL = "https://dev.rezeet.io/api"
// const BASEURL = "http://54.210.49.103:3000/api"
// const BASEURL = "https://dev.rezeet.io/api/"
// const BASEURL = "http://34.230.1.59:3000/api"

const IMAGEUPLORD = "https://dev.rezeet.io/api/user/profile/image/update"
// const IMAGEUPLORD = "http://54.210.49.103:3000/api/user/profile/image/update"
// const IMAGEUPLORD = "https://api.cmemove.com/api/moving/service/upload/image"

const USERURl = `${BASEURL}/user`



export const apimethods = {
    P: 'post',
    G: 'get',
    D: 'delete',
}



export const apiRoutes = {
    register: `${USERURl}/signup`,
    logIn: `${USERURl}/login`,
    forgetPass: `${USERURl}/password/forgot`,
    forgetPassupdate: `${USERURl}/password/reset`,
    verification: `${USERURl}/account/verification`,
    contectOtpSend: `${BASEURL}/user/contact/otp/send`,
    contectVarfy: `${BASEURL}/user/contact/otp/verify`,
    emailOtpSend: `${BASEURL}/user/email/otp/send`,
    emailVarify: `${BASEURL}/user/email/otp/verify`,
    profiledata: `${BASEURL}/user/profile/get/details`,

    profileUpdate: `${BASEURL}/user/profile/update`,
    getAllRecipt: `${BASEURL}/receipt/get/all`,
    changeCategory: `${BASEURL}/receipt/change/category`,
    getRecentData: `${BASEURL}/receipt/recent/get`,
    saveRecipt: `${BASEURL}/receipt/save`,
    scanwithoutLogin: `${BASEURL}/user/scan/with/out/login`,
    deleteReci: `${BASEURL}/receipt/delete`,
    generateRecipt: `${USERURl}/generate/invoice`,

   


}

export const apiMethod = async (config, request, responce) => {

    // const token = await AsyncStorage.getItem("Token");
    const token = await AsyncStorage.getItem('Token');
    let header
    if (token) {
        header = {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        }
    } else {
        header = {
            'Content-Type': 'application/json'
        }
    }
    let body = {
        headers: header,
        data: JSON.stringify(config?.data),
        ...config
    };

    console.log('====================================')
    console.log("bodybodybody", body)
    console.log('====================================')
    return axios(body)
        .then(response => {
            console.log('REGISTER DATA IN SERVICE', response.data);
            let bucketObj = {
                registerData: response.data
            }
            return bucketObj;
        });



}


export const ImageApi = async (imagedata, request, responce) => {

    const token = await AsyncStorage.getItem('Token');

    console.log("tokentokentokentoken", token);

    let Imgdata = new FormData();
    Imgdata.append('image', {
        uri: imagedata?.path,
        name: imagedata?.imageApi,
        type: imagedata?.mime,
    })


    let config = {
        method: 'post',
        url: IMAGEUPLORD,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        },
        data: Imgdata
    };

    return axios.request(config)
        .then(response => {
            console.log('Image data uplord', response.data);
            let bucketObj = {
                image_data: response.data
            }
            return bucketObj;
        });



}


