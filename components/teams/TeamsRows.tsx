import React, { useState } from 'react'
import { Button } from '../ui/button'
import Columns from '../table/Columns'
import { Eye, FileEdit, Trash2 } from 'lucide-react'
import Modal from '../Modal'
import { useForm } from 'react-hook-form'
import { 
  Form,
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { formSchemaUpdateTeam } from '@/lib/FormSchemaTeams'
import { DeleteTeam, UpdateTeam } from '@/lib/CRUD-Teams'

const TeamsRows = ({entry,columns}:any) => {

  const router = useRouter();
  const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
  const [modalOpenEdite, setModalOpenEdite] = useState<boolean>(false);
  const textDelete = "Are you sure, you want to delete this Team!";
  const textEdit = "Edit Team";

  async function handleDelete(id: number){
    const response =await DeleteTeam(id)
    setModalOpenDelete(false);
    router.push('/team');
  }
  function handleCloseModalDelete(){
      setModalOpenDelete(false);
  }
  const form = useForm<z.infer<typeof formSchemaUpdateTeam>>({
    resolver: zodResolver(formSchemaUpdateTeam),
    defaultValues: {
        id: entry.id,
        nome: entry.nome,
    },
  })
  async function onSubmit(values: z.infer<typeof formSchemaUpdateTeam>) {
    const response = await UpdateTeam(values);
    console.log(response.status);
    if(response.status===200){   
      console.log(response.status)
      handleCloseModalEdite()
      router.push('/team');
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
      <td className='cursor-pointer flex gap-4'><Eye/> 
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
                      <Input placeholder="Digite o nome do time" {...field} />
                  </FormControl>
                  <FormDescription>
                      This is your public display name.
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

export default TeamsRows