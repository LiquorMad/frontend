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
import { useRouter } from "next/navigation"
import Modal from "../Modal"
import { CreateTeam } from "@/lib/CRUD-Teams"

const formSchema = z.object({
  nome: z.string().min(2, {
    message: "Nome must be at least 2 characters.",
  }),
  
})

export function ModalRegisterTeam({ visible, onClose }:any) {
  if(!visible) return null;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
    },
  })
  const router = useRouter();
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await CreateTeam(values);
    if(response.status==201){   
      console.log(response.status)
      router.push('/team');
      onClose()
    }
  }

return (
  <Modal visible={visible} onClose={onClose}>
    <ScrollArea className="h-[210px] w-[450px] rounded-md border p-4">
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