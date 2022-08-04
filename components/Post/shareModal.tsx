import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface IProps {
    nft: {
        post_id: number
    },
    onClose: () => void
}

interface IButtonProps{
    label: string,
    onClick: () => void
}
const ShareModal: React.FC<IProps> = ({ nft, onClose }) => {
    const router = useRouter();
    const ModalHeader = () => {
        return (
            <div className='w-full flex'>
                <div className='ml-auto'>
                    <Image src="/icons/close-modal-icon.svg" className='cursor-pointer' alt='close' width={24} height={24} onClick={onClose} />
                </div>
            </div>
        )
    }

    const Button:React.FC<IButtonProps> = ({ label, onClick }) => {
        console.log("Checking NFT "+JSON.stringify(nft))
        return (
            <button onClick={onClick} className='bg-primary p-4 rounded-full w-[150px] hover:opacity-[0.8]'>
                <label className='font-bold'>{label}</label>
            </button>
        )
    }
    return (
        <div className='fixed h-[100vh] overflow-hidden flex justify-around items-center top-0 w-full left-0 bg-[#13141457]  z-50 ' style={{zIndex: 80}}>
            <div className='p-4 rounded-[5px] bg-[#1E2021] w-[50%] h-[40vh]'>
               <ModalHeader />
               <div className='flex justify-around'>
                <div className='flex gap-4'>
                    <Image src="/icons/share-icon.svg" alt="share" width={30} height={30} />
                    <label className='text-[#878686] text-[18px]'>Share</label>
                </div>
               </div>
               <div className='flex justify-around mt-16'>
                <div className='flex gap-4'>
                    <Button label="Earn2gether" onClick={() => router.push(`profile?post=${nft?.post_id}`)} />
                    <Button label="My flow" onClick={() => {}} />
                    <Button label="Send"  onClick={() => {}}/>
                </div>
               </div>
            </div>
        </div>
    )
}

export default ShareModal;