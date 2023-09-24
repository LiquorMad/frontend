import { z } from "zod"

export const formSchemaCreateTeam = z.object({
    nome: z.string()
    .min(2, {
      message: "Nome must be at least 2 characters.",
    })
    .transform(nome => {
      return nome.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
  })

  export const formSchemaUpdateTeam = z.object({
    id: z.number(),
    nome: z.string()
    .min(2, {
      message: "Nome must be at least 2 characters.",
    })
  })