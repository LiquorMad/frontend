import React, { useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Eye, FileEdit, Trash2 } from 'lucide-react';
import Modal from '../Modal';
import Columns from '../table/Columns';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ScrollArea } from '../ui/scroll-area';
import { useRouter } from 'next/router';
import { DeleteMatch, UpdateMatch } from '@/lib/CRUD-Matchs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formSchemaUpdateMatch } from '@/lib/FormSchemaMatchs';
import { Button } from '../ui/button';

function MatchRows({entry,columns,players,teams}:any) {
    const router = useRouter();
  const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
  const [modalOpenEdite, setModalOpenEdite] = useState<boolean>(false);
  const textDelete = "Are you sure, you want to delete this Team!";
  const textEdit = "Edit Match";
  async function handleDelete(id: number){
    const response =await DeleteMatch(id)
    setModalOpenDelete(false);
    router.push('/match');
  }
  function handleCloseModalDelete(){
      setModalOpenDelete(false);
  }
  const form = useForm<z.infer<typeof formSchemaUpdateMatch>>({
    resolver: zodResolver(formSchemaUpdateMatch),
    defaultValues: {
      nome: entry.nome,
      id_player_1: entry.player_1,
      id_player_2: entry.player_2,
      id_time_1: entry.time_1,
      id_time_2: entry.time_2,
    },
  })
  async function onSubmit(values: z.infer<typeof formSchemaUpdateMatch>) {
    console.log(values)
    const response = await UpdateMatch(values);
    console.log(response.status);
    if(response.status===200){   
      console.log(response.status)
      handleCloseModalEdite()
      router.push('/match');
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
                <ScrollArea className="h-[400px] w-[450px] rounded-md border p-4">
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
                        <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite o nome da partida" {...field} />
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
                        name="id_player_1"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Player 1</FormLabel>
                            <FormControl>
                            <Select onValueChange={field.onChange} >
                                <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Escolhe o Player 1" />
                                </SelectTrigger>
                                <SelectContent>
                                <ScrollArea className="h-[200px] w-[200px] rounded-md border p-4">
                                {players.map((player:any) =>(
                                    <SelectItem  
                                    value={player.id.toString()} 
                                    key={player.id}>{player.nome}
                                    </SelectItem>
                                ))}
                                </ScrollArea>
                                </SelectContent>
                            </Select>
                            </FormControl>
                            <FormDescription>
                                This is your public display apelido.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="id_player_2"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>P2</FormLabel>
                            <FormControl>
                            <Select onValueChange={field.onChange} >

                                <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Escolhe o Player 2" />
                                </SelectTrigger>
                                <SelectContent>
                                <ScrollArea className="h-[200px] w-[200px] rounded-md border p-4">
                                {players.map((player:any) =>(
                                    <SelectItem 
                                    value={player.id.toString()} 
                                    key={player.id}>{player.nome}
                                    </SelectItem>
                                ))}
                                </ScrollArea>
                                </SelectContent>
                            </Select>
                            </FormControl>
                            <FormDescription>
                                This is your public display apelido.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        
                        <FormField
                        control={form.control}
                        name="id_time_1"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Time 1</FormLabel>
                            <FormControl>
                            <Select onValueChange={field.onChange} >
                                <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Escolhe o time 1" />
                                </SelectTrigger>
                                <SelectContent>
                                <ScrollArea className="h-[200px] w-[200px] rounded-md border p-4"> 
                                {teams.map((team:any) =>(
                                    <SelectItem 
                                    value={team.id.toString()} 
                                    key={team.id}>{team.nome}
                                    </SelectItem>
                                ))}
                                </ScrollArea>
                                </SelectContent>
                            </Select>
                            </FormControl>
                            <FormDescription>
                                This is your public display apelido.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="id_time_2"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Time 2</FormLabel>
                            <FormControl>
                            <Select onValueChange={field.onChange} >
                                <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Escolhe o time 2" />
                                </SelectTrigger>
                                <SelectContent>
                                <ScrollArea className="h-[200px] w-[200px] rounded-md border p-4"> 
                                {teams.map((team:any) =>(
                                    <SelectItem 
                                    value={team.id.toString()} 
                                    key={team.id}>{team.nome}
                                    </SelectItem>
                                ))}
                                </ScrollArea>
                                </SelectContent>
                            </Select>
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
                </ScrollArea>
            </Modal>
            <Trash2 onClick={()=>setModalOpenDelete(true)} color="#e40707" className='cursor-pointer'/>
            <Modal visible={modalOpenDelete} onClose={handleCloseModalDelete} text={textDelete}>
                <Button variant="outline"onClick={()=>handleDelete(entry.id)}>Yes</Button>
            </Modal>
        </td>
    </tr>
  )
}

export default MatchRows