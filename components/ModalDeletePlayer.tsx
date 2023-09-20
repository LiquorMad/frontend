"use client"
import React from 'react'
import { Button } from './ui/button';

interface ModalProps{
  visible: boolean,
  children: React.ReactNode
  onClose: (open: boolean) => void
}
function ModalDeletePlayer({ visible,children,onClose }:any) {
  
  if(!visible) return null;
  return (
    <div  className="modal backdrop-blur-sm fixed bg-black bg-opacity-25 p-4 inset-0 
      flex justify-center items-center">
      <div className="bg-white p-4 rounded m-2 drop-shadow-xl">
        <div className=" rounded-md border p-4">
          {children}
          <Button className="float-right" variant="outline" onClick={onClose}>No</Button>
        </div>
      </div>
    </div>
    )
}

export default ModalDeletePlayer