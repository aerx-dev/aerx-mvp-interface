// custom hook for IPFS
import { useEffect, useState } from "react";
import { pinFileToIPFS } from "../lib/ipfsPinata";
import { upload } from "../lib/crust";
import { UseToastOptions } from "@chakra-ui/react";
import shajs from "sha.js";

export type usePinataProps = {
    file: File | undefined;
    toast: (
        status: UseToastOptions["status"],
        description: string,
        toastId: string,
    ) => void;
};

export type IPFSDataType = {
    fileUrl: string | null;
    fileSize: string | null;
    urlSha256: string | null;
};

// Change this for using crust or not. If you use crust we will unpin the file from pinata
const deployCrust = false;

// pass the file or state you want to upload. It will upload the file and retrun the response.
export default function usePinata(
    file: File | undefined,
    toast: (
        status: UseToastOptions["status"],
        description: string,
        toastId: string,
    ) => void,
) {
    const [ipfsData, setIpfsData] = useState<IPFSDataType>({
        fileUrl: null,
        fileSize: null,
        urlSha256: null,
    });

    useEffect(() => {
        async function fileUpload() {
            const filename = file!.name;
            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];

            // TODO assert that it is a image file
            console.log("fileType to upload: ", fileType); //ex: zip, rar, jpg, svg etc.

            pinFileToIPFS(file, filename)
                .then((res: any) => {
                    // Createthe url and get the sha256 base64 hash of the url
                    const _fileUrl =
                        "https://ipfs.io/ipfs/" + res.data.IpfsHash;
                    const _urlHash = new shajs.sha256()
                        .update(_fileUrl)
                        .digest("base64");

                    setIpfsData((prevIpfs) => ({
                        ...prevIpfs,
                        fileUrl: _fileUrl,
                        fileSize: res.data.PinSize,
                        urlSha256: _urlHash,
                    }));
                    toast(
                        "success",
                        "File deployed to IPFS! CID: " + res.data.IpfsHash,
                        "ipfsSccss",
                    );
                    return [res.data.IpfsHash, res.data.PinSize];
                })
                .then(
                    ([fileCid, filePinSize]: [
                        fileCid: any,
                        filePinSize: any,
                    ]) => {
                        if (deployCrust) {
                            upload(fileCid, filePinSize)
                                .then((crustScs) => {
                                    if (crustScs === true) {
                                        toast(
                                            "success",
                                            "File deployed to Crust!",
                                            "crustSccss",
                                        );
                                        // TODO: fix below
                                        // unpinPinata(fileCid);
                                    }
                                })
                                .catch((error) => console.log(error));
                        }
                    },
                )
                .catch((e: Error) => {
                    toast("error", "Couldn't pin file to Pinata!", "ipfsError");
                    console.log("Couldn't pin file to Pinata ", e);
                });
        }

        file && fileUpload();
    }, [file]);

    return ipfsData;
}
