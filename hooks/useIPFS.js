// custom hook for IPFS
import { useEffect, useState } from "react";
import { create } from "ipfs-core";

// pass the file or state you want to upload. It will upload the file and retrun the response.
export default function useIPFS(file) {

    var [ipfsData, setIpfsData] = useState({
        fileUrl: null,
        fileSize: null,
    });

    useEffect(() => {

        async function fileUpload() {
            // console.log(window.ipfs)
            const res = await window.ipfs.add(file);
            // console.log(res);
            setIpfsData((prevIpfs) => {
                return {
                    ...prevIpfs,
                    fileUrl: "https://ipfs.io/ipfs/" + res.path,
                    fileSize: res.size,
                }
            })
        }

        { file && fileUpload() }
    }, [file])
    console.log(ipfsData)

    return ipfsData
}
