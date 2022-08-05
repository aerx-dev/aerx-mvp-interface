import React from 'react'
import Image from 'next/image';
import { Input, Textarea, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { nearStore } from '@/stores/near';
import useCustomToast from '@/hooks/useCustomToast';

const Earn2Gether: React.FC = () => {
    const nearState = nearStore((state: any) => state);
    const router = useRouter();
    const post_id = router.query?.post;
    const toast = useCustomToast();
    let postToSave = {
        title: "AERX PostNFT for " + nearState.accountId,
        description: "Good post",
        issued_at: new Date().toISOString(),
    };
    const onPost = async () => {
        console.log("Submit just clicked");
        console.log("Accountid: ", nearState.accountId);
        console.log("Post id: ", post_id);
        try {
            await nearState.profileContract?.mint_post({
                user_id: nearState.accountId,
                origin_post_id: post_id,
                token_metadata: postToSave,
            },
                "300000000000000", //attached gas
                "10000000000000000000000", //attached deposit
            )
        } catch (error: any) {
            console.log("ERROR MINT COULD NOT BE COMPLETED");
            toast("error", "SWAP ERROR: " + error.message, "CNFTerror");

        }
    }


    return (
        <div className='flex bg-[#1E2021] w-full rounded-[5px]'>
            <div className={`w-[50%] bg-[#1E2021]`}>
                <div className='bg-[#2C2F31] w-[100%] h-[40vh] flex justify-around items-center'>
                    <Image src="/images/default-image.svg" alt="upload nft" width={130} height={130} />
                </div>
                <div className='p-4'>
                    <Textarea className='' rows={14} />
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
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-[14px] text-gray-500 mt-4'>Name: </label>
                        <label className='font-semibold mt-4'>Example post</label>
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
                                <label className="text-white font-semibold text-[14px]">@pashq.aerx</label>
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
                                <div className="w-[40px] h-[40px] bg-[#ffffff08] flex justify-around items-center rounded-full">
                                    <div className='mt-[5px]'>
                                        <Image src="/images/default-image.svg" alt="upload nft" width={25} height={25} />
                                    </div>
                                </div>
                                <div className='text-center mt-1'>
                                    <label className='text-[13px] text-gray-500 mt-4'>Photo</label>
                                </div>
                            </div>

                            <div>
                                <div className="w-[40px] h-[40px] bg-[#ffffff08] flex justify-around items-center rounded-full">
                                    <div className='mt-[5px]'>
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
    )
}

export default Earn2Gether;
