'use client'

import React, { useState } from 'react'
import Columns from './Columns'
import { useRouter } from 'next/navigation';
import { Eye, FileEdit, Trash2 } from 'lucide-react';
import ModalDeletePlayer from './ModalDeletePlayer';
import { Button } from './ui/button';
import { DeletePlayer } from '@/lib/CRUD';

const PlayersComponent = ({entry,columns}:any) => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    console.log(modalOpen);

    async function handleDelete(id: number){
        await DeletePlayer(id);
        router.push('/player');
    }
    function handleClose(){
        setModalOpen(false);
    }
    
  return (
    <tr key={entry.id}>
        {columns.map((column:any) => (
            <Columns entry={entry} column={column}/>
        ))}
        <td className='cursor-pointer'><Eye /></td>
        <td className='cursor-pointer'><FileEdit /></td>
        <td onClick={()=>setModalOpen(true)}>
            <Trash2 color="#e40707" className='cursor-pointer'/>
            <ModalDeletePlayer visible={modalOpen} onClose={handleClose}>
                <h3 className="font-bold text-lg">Are you sure, you want to delete this Player!</h3>
                <Button variant="outline"onClick={()=>handleDelete(entry.id)}>Yes</Button>
            </ModalDeletePlayer>
        </td>
    </tr>
  )
}

export default PlayersComponent