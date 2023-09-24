"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/router"
import { CreatePlayer } from "@/lib/CRUD-Players"
import { formSchemaRegisterPlayer } from "@/lib/FormSchemaPlayers"
import Modal from "../Modal"

export function ModalRegisterPlayer({ visible, onClose }:any) {

  const form = useForm<z.infer<typeof formSchemaRegisterPlayer>>({
    resolver: zodResolver(formSchemaRegisterPlayer),
    defaultValues: {
      nome: "",
      apelido: "",
    },
  })
  
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchemaRegisterPlayer>) {
    const response = await CreatePlayer(values);
    if(response.status===201){   
      console.log(response.status)
      router.push('/player');
      onClose()
    }
  }

return (
  <Modal visible={visible} onClose={onClose}>
  <ScrollArea className="h-[350px] w-[450px] rounded-md border p-4">
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
      </ScrollArea>
      </Modal>
  )
}