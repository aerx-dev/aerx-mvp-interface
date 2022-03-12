// custom hook for IPFS
import { useEffect, useState } from "react";

// pass the file or state you want to upload. It will upload the file and retrun the response.
export default function useIPFS(file) {
    var [ipfsData, setIpfsData] = useState({
        fileUrl: null,
        fileSize: null,
    });

    useEffect(() => {
        async function fileUpload() {
            // console.log(window.ipfs)
            const filename = file.name;

            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];

            // TODO assert that it is a image file
            console.log("fileType to upload: ", fileType); //ex: zip, rar, jpg, svg etc.
            const res = await window.ipfs.add(file);
            // console.log(res);
            setIpfsData((prevIpfs) => {
                return {
                    ...prevIpfs,
                    fileUrl: "https://ipfs.io/ipfs/" + res.path,
                    fileSize: res.size,
                };
            });
        }

        {
            file && fileUpload();
        }
    }, [file]);
    console.log(ipfsData);

    return ipfsData;
}
