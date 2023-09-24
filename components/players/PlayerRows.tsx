
import React, { useState } from 'react'
import Columns from '../table/Columns'
import { useRouter } from 'next/router';
import { Eye, FileEdit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { DeletePlayer, EditPlayer } from '@/lib/CRUD';
import Modal from '../Modal';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchemaUpdatePlayer } from '@/lib/FormSchema';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

const PlayerRows = ({entry,columns}:any) => {
    const router = useRouter();
    const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
    const [modalOpenEdite, setModalOpenEdite] = useState<boolean>(false);
    const textDelete = "Are you sure, you want to delete this Player!";
    const textEdit = "Edit task";

    async function handleDelete(id: number){
        await DeletePlayer(id)
        setModalOpenDelete(false);
        router.push('/player');
    }
    function handleCloseModalDelete(){
        setModalOpenDelete(false);
    }
    const form = useForm<z.infer<typeof formSchemaUpdatePlayer>>({
        resolver: zodResolver(formSchemaUpdatePlayer),
        defaultValues: {
            id: entry.id,
            nome: entry.nome,
            apelido: entry.apelido,
        },
      })
      async function onSubmit(values: z.infer<typeof formSchemaUpdatePlayer>) {
        const response = await EditPlayer(values);
        console.log(response.status);
        if(response.status===200){   
          console.log(response.status)
          router.push('/player');
          handleCloseModalEdite()
        }
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
            <Modal visible={modalOpenEdite} onClose={handleCloseModalEdite} text={textEdit}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
                    <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input placeholder="Digite o nome do Jogador" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="apelido"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Apelido</FormLabel>
                        <FormControl>
                            <Input placeholder="Digite o apelido" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your public display apelido.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" variant="outline">Submit</Button>
                </form>
            </Form>
            </Modal>
            <Trash2 onClick={()=>setModalOpenDelete(true)} color="#e40707" className='cursor-pointer'/>
            <Modal visible={modalOpenDelete} onClose={handleCloseModalDelete} text={textDelete}>
                <Button variant="outline"onClick={()=>handleDelete(entry.id)}>Yes</Button>
            </Modal>
        </td>
    </tr>
  )
}

export default PlayerRows