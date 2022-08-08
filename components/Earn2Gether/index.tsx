import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Textarea } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { nearStore } from '@/stores/near';
import { IPFSDataType } from '@/hooks/usePinata';
import useCustomToast from '@/hooks/useCustomToast';
import { pinFileToIPFS } from '@/lib/ipfsPinata';
import shajs from "sha.js";
import { upload } from '@/lib/crust';


const Earn2Gether: React.FC = () => {
    const nearState = nearStore((state) => state) as any;
    const router = useRouter();
    const post_id = router.query?.post;
    const toast = useCustomToast();

    const sharedPost = router.query.post as string;
    const postMetaData = {
        title: "AERX PostNFT for " + nearState.accountId,
        description: '',
        media: '',
        media_hash: '',
        issued_at: '',
        extra: '',
    }
    const [sharedPostMetaData, setPost] = React.useState({ ...postMetaData });
    const [ownerId, setOwnerId] = React.useState('');
    const [file, setFile] = useState<File>();
    const [uploadFile, setUploadFile] = useState();
    const [body, setBody] = useState({
        text: "",
        media_type: "text",
    });
    const [ipfsData, setIpfsData] = useState<IPFSDataType>({
        fileUrl: null,
        fileSize: null,
        urlSha256: null,
    });
    const [filePreview, setFilePreview] = useState<string>();
    const deployCrust = false;
    const getPost = () => {
        const post = nearState?.feed?.find((post: any) => post.post_id === sharedPost);
        if (post) {
            setPost(post?.metadata);
            setOwnerId(post?.owner_id);

        }
    }
    useEffect(() => {
        getPost();
    }, [])

    const onPost = async () => {
        if (!body.text) return toast("warning", "Post cannot be empty!", "feedpage");
        if (file) {
            await fileUpload(file);
        }
        const postToSave = {
            title: "AERX PostNFT for " + nearState.accountId,
            description: body.text,
            media: ipfsData.fileUrl,
            media_hash: ipfsData.urlSha256,
            issued_at: new Date().toISOString(),
            extra: JSON.stringify(body),
        }
        try {
            await nearState.profileContract?.mint_post({
                user_id: nearState.accountId,
                origin_post_id: parseInt(post_id as string),
                token_metadata: postToSave,
            },
                "300000000000000", //attached gas
                "10000000000000000000000", //attached deposit
            ).then(() => {
                toast("success", "Post created successfully");
                router.push('/flow');
            })
        } catch (error: any) {
            console.log("ERROR MINT COULD NOT BE COMPLETED");
            toast("error", "MINT POST ERROR: " + error.message, "CNFTerror");

        }
    }

    const uploadPhoto = () => {
        (document.getElementsByClassName('upload-photo')[0] as any).click();

    }

    function fileChange(event: any) {
        const file = event.target.files[0]
        if (file) {
            // // TODO check what type it is
            const filename = file?.name;
            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            setBody((prevBody: any) => {
                return {
                    ...prevBody,
                    media_extension: fileType,
                };
            });
            setFilePreview(URL.createObjectURL(event.target.files[0]));
            setFile(file)
        }
    }

    async function fileUpload(file: any) {
        const filename = file!.name;
        var parts = filename.split(".");
        const fileType = parts[parts.length - 1];

        pinFileToIPFS(file, filename)
            .then((res: any) => {
                // Createthe url and get the sha256 base64 hash of the url
                const _fileUrl =
                    "https://ipfs.io/ipfs/" + res.data.IpfsHash;
                const _urlHash = new shajs.sha256()
                    .update(_fileUrl)
                    .digest("base64");

                setIpfsData((prevIpfs: any) => ({
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



    return (
        <div className='flex bg-[#1E2021] w-full rounded-[5px]'>
            <div className={`w-[50%] bg-[#1E2021]`}>
                {!filePreview &&
                    <div className='bg-[#2C2F31] w-[100%] h-[40vh] flex justify-around items-center'>
                        <Image src="/images/default-image.svg" alt="upload nft" width={130} height={130} />
                    </div>
                }
                {filePreview &&
                    <div className='bg-[#2C2F31] w-[100%] h-[40vh] flex justify-around items-center'>
                        <Image src={filePreview} alt="upload nft" width={340} height={315} />
                    </div>
                }
                <div className='p-4'>
                    <Textarea className='' rows={14} onChange={(event) => setBody({ ...body, text: event.target.value })} />
                </div>
            </div>
            <div className='p-4 w-[50%]'>
                <div className='flex'>
                    <div className='ml-auto'>
                        <Image src="/icons/close-modal-icon.svg" onClick={() => router.push('/flow')} className='ml-auto cursor-pointer' alt="close" width={20} height={20} />
                    </div>
                </div>

                <div className='p-4'>
                    <div>
                        <h1 className='text-white text-center font-semibold'>Create post</h1>

                        <div className='flex flex-col'>
                            <label className='text-[14px] text-gray-500 mt-4'>Name: </label>
                            <label className='font-semibold mt-4'>{sharedPostMetaData?.title}</label>
                        </div>

                        <div className="mt-4">
                            <label className='text-[14px] text-gray-500 mt-2'>Type: </label>
                            <div className='flex gap-4 mt-4'>
                                <div className="flex gap-2 rounded-full bg-[#6154f049] hover:bg-[#6154f069]  cursor-pointer px-6 py-2">
                                    <Image src="/icons/post-btn-icon.svg" alt="post" width={20} height={20} />
                                    <label className="text-primary font-semibold text-[14px]">Post</label>
                                </div>
                                <div className='flex gap-2 rounded-full bg-[#ff762730] cursor-pointer hover:bg-[#ff762762] px-6 py-2'>
                                    <Image src="/icons/tempo-fire-icon.svg" alt="post" width={20} height={20} />
                                    <label className='text-[#FF7527] font-semibold text-[14px]'>Tempo</label>
                                </div>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <label className='text-[14px] text-gray-500 mt-4'>Together with: </label>

                            <div className='flex gap-2 mt-4'>
                                <div className="flex  rounded-full bg-[#ffffff08] gap-4 cursor-pointer px-6 py-2">
                                    <label className="text-white font-semibold text-[14px]">{ownerId}</label>
                                    <Image src="/icons/close-icon.svg" alt="post" width={20} height={20} />
                                </div>
                                <div className='flex justify-around gap-2 rounded-full bg-[#ffffff08] cursor-pointer p-2 w-[40px] h-[40px]'>
                                    <label className='text-white font-semibold text-[18px] text-center'>+</label>
                                </div>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <label className='text-[14px] text-gray-500 mt-4'>Add content: </label>

                            <div className='mt-5 flex justify-between w-[80%]'>
                                <div>
                                    <div className="w-[40px] h-[40px] bg-[#ffffff08] flex justify-around items-center rounded-full " onClick={uploadPhoto}>
                                        <div className='mt-[5px] cursor-pointer'>
                                            <Image src="/images/default-image.svg" alt="upload nft" width={25} height={25} />
                                        </div>
                                    </div>
                                    <div className='text-center mt-1 cursor-pointer' onClick={uploadPhoto}>
                                        <label className='text-[13px] text-gray-500 mt-4 cursor-pointer'>Photo</label>
                                        <input type='file' className='upload-photo' hidden accept='image/*' onChange={fileChange} />
                                    </div>
                                </div>

                                <div>
                                    <div className="w-[40px] h-[40px] bg-[#ffffff08] flex justify-around items-center rounded-full">
                                        <div className='mt-[5px] '>
                                            <Image src="/icons/camera-icon.svg" alt="upload nft" width={25} height={25} />
                                        </div>
                                    </div>
                                    <div className='text-center mt-1'>
                                        <label className='text-[13px] text-gray-500 mt-4'>Video</label>
                                    </div>
                                </div>


                                <div>
                                    <div className="w-[40px] h-[40px] bg-[#ffffff08] flex justify-around items-center rounded-full">
                                        <div className='mt-[5px]'>
                                            <Image src="/icons/text-icon.svg" alt="upload nft" width={25} height={25} />
                                        </div>
                                    </div>
                                    <div className='text-center mt-1'>
                                        <label className='text-[13px] text-gray-500 mt-4'>Text</label>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-[6em]'>
                                <button onClick={onPost} className='bg-primary text-white p-3 rounded-full  w-full'>Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Earn2Gether;
