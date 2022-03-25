//imports needed for this function
import { upload } from "./crust";
const axios = require('axios');
const FormData = require('form-data');

// Change this for using crust or not. If you use crust we will unpin the file from pinata
const deployCrust = true;
const pinataApiKey = process.env.NEXT_PUBLIC_PIN_K;
const pinataSecretApiKey = process.env.NEXT_PUBLIC_PIN_S;


export const pinFileToIPFS = async (content, name = "") => {

    var curstScs = false
    // var pinataRes
    const res = pinPinata(content, name)
    
    // console.log("Razz:   ", res)
    return res
}


// Pin file to Pinata
export const pinPinata = (content, name = "") => {

    let data = new FormData();
    data.append('file', content);

    //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
    // metadata is optional
    const metadata = JSON.stringify({
        name: name,
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata)

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;


    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            //handle error here
            console.log(error);
            return
        });
}

// Pin file to Pinata
export const unpinPinata = (fileCid) => {

    const url = `https://api.pinata.cloud/pinning/unpin/${fileCid}`;
    return axios
        .delete(url, {
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function (response) {
            //handle response here
            console.log("Pinata Unpin: ", response)
        })
        .catch(function (error) {
            //handle error here
            console.log("Pinataunpin error: ", error)
        });
};
