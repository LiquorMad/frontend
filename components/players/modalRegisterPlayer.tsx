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
import { CreatePlayer } from "@/lib/CRUD"

export const formSchema = z.object({
  nome: z.string()
  .min(2, {
    message: "Nome must be at least 2 characters.",
  })
  .transform(nome => {
    return nome.trim().split(' ').map(word => {
      return word[0].toLocaleUpperCase().concat(word.substring(1))
    }).join(' ')
  }),
  apelido: z.string()
  .min(2, {
    message: "Apelido must be at least 2 characters.",
  })
  .transform(apelido => {
    return apelido.trim().split(' ').map(word => {
      return word[0].toLocaleUpperCase().concat(word.substring(1))
    }).join(' ')
  }),
})

export function ModalRegisterPlayer({ visible, onClose }:any) {
  if(!visible) return null;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      apelido: "",
    },
  })
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await CreatePlayer(values);
    if(response.status===201){   
      console.log(response.status)
      router.push('/player');
      onClose()
    }
  }

return (
  <div  className=" backdrop-blur-sm fixed bg-black bg-opacity-25 p-4 inset-0 flex 
    justify-center items-center ">
  <div className="bg-white p-4 rounded m-2 drop-shadow-xl">
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
            <Button className="float-right" variant="outline" onClick={onClose}>Cancel</Button>
          </form>
        </Form>
      </ScrollArea>
    </div>
    </div>
  )
}