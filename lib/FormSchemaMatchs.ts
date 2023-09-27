import { z } from "zod"

export const formSchemaCreateMatch = z.object({
    nome: z.string()
  .min(2, {
    message: "Nome must be at least 2 characters.",
  })
  .transform(nome => {
    return nome.trim().split(' ').map(word => {
      return word[0].toLocaleUpperCase().concat(word.substring(1))
    }).join(' ')
  }),
  id_player_1: z.string(),
  id_player_2: z.string(),
  id_time_1: z.string(),
  id_time_2: z.string(),
  })

  export const formSchemaUpdateMatch = z.object({
    id: z.number(),
    nome: z.string()
    .min(2, {
      message: "Nome must be at least 2 characters.",
    })
    .transform(nome => {
      return nome.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
    player_1: z.string(),
    player_2: z.string(),
    time_1: z.string(),
    time_2: z.string(),
  })