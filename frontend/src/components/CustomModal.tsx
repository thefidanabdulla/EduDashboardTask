import React from 'react';
import { IoClose } from "react-icons/io5";


interface CustomModalProps{
  setIsModalShowing: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
}

const CustomModal = ({ title, setIsModalShowing, children }: CustomModalProps) => {
  return (
    <div className='w-full h-screen overflow-y-auto fixed top-0 left-0 z-50 flex justify-center items-center p-6 bg-[#00000080]'>
      <div className='rounded-[20px] bg-white p-6 max-w-[780px] max-h-[90vh] overflow-y-auto w-full flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h4 className='text-3xl text-indigo-400 font-semibold'>{title}</h4>
          <button className="text-[32px] text-indigo-400 transition-all duration-300 hover:text-red-400" onClick={() => setIsModalShowing(false)}>
            <IoClose />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default CustomModal