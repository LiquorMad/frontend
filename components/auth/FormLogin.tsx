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
import { formSchemaAuth } from "@/lib/FormSchemaAuth"
import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"

function FormLogin() {
    
    const form = useForm<z.infer<typeof formSchemaAuth>>({
        resolver: zodResolver(formSchemaAuth),
        defaultValues: {
          email: "",
          password: "",
        },
      })
      
      const { signIn } = useContext(AuthContext)

      async function onSubmit(values: z.infer<typeof formSchemaAuth>) {
        const email=values.email
        const password=values.password
        await signIn({email,password});
      }
      return (
        <ScrollArea className="h-[350px] w-[450px] rounded-md border p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
                  <FormField
                    control={form.control}
                    name="email"
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
                    name="password"
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
        )
      }

export default FormLogin



    