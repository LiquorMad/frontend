"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

import { loadPlayers } from '../../lib/load-datas'
import { GetServerSideProps } from "next"
import { Players } from "@/pages/player"
import { Teams } from "@/pages/team"
import React, { useState } from "react"
import { Link } from "lucide-react"
import { formSchemaCreateMatch } from "@/lib/FormSchemaMatchs"
import { CreateMatch } from "@/lib/CRUD-Matchs"
import Modal from "../Modal"

type MatchProps = {
  players: Players[],
  teams: Teams[],
  visible: boolean,
  onClose: () => void,
}
export function ModalRegisterMatch({ visible, onClose,players,teams }:MatchProps) {
  if(!visible) return null;
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchemaCreateMatch>>({
    resolver: zodResolver(formSchemaCreateMatch),
    defaultValues: {
      nome: "",
      id_player_1: "",
      id_player_2: "",
      id_time_1: "",
      id_time_2: "",
    },
  })
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchemaCreateMatch>) {
    const response = await CreateMatch(values)
    
    if(response.status==201){
      
      router.push('/match');
      onClose()
    }
    
  }
return (
  <Modal visible={visible} onClose={onClose}>
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
                  {players.map((player) =>(
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
                  {players.map((player) =>(
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
                  {teams.map((team) =>(
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
                  {teams.map((team) =>(
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
  )
}