import React, { useState } from 'react'
import Columns from '../table/Columns'
import { useRouter } from 'next/navigation';
import { Eye, FileEdit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { DeletePlayer } from '@/lib/CRUD';
import Modal from '../Modal';

const PlayerRows = ({entry,columns}:any) => {
    const router = useRouter();
    const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
    const [modalOpenEdite, setModalOpenEdite] = useState<boolean>(false);

    async function handleDelete(id: number){
        await DeletePlayer(id)
        router.refresh()
    }
    function handleCloseModalDelete(){
        setModalOpenDelete(false);
    }
    function handleCloseModalEdite(){
        setModalOpenEdite(false);
    }
    
  return (
    <tr key={entry.id}>
        {columns.map((column:any) => (
            <Columns key={column} entry={entry} column={column}/>
        ))}
        <td className='cursor-pointer'><Eye/> </td>
        <td className='cursor-pointer flex'>
            <FileEdit onClick={()=>setModalOpenEdite(true)} />
            <Modal visible={modalOpenEdite} onClose={handleCloseModalEdite}>
            
            </Modal>
            <Trash2 onClick={()=>setModalOpenDelete(true)} color="#e40707" className='cursor-pointer'/>
            <Modal visible={modalOpenDelete} onClose={handleCloseModalDelete}>
                <h3 className="font-bold text-lg">Are you sure, you want to delete this Player!</h3>
                <Button variant="outline"onClick={()=>handleDelete(entry.id)}>Yes</Button>
            </Modal>
        </td>
    </tr>
  )
}

export default PlayerRows