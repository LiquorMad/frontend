import { z } from "zod"

export const formSchemaRegisterPlayer = z.object({
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

  export const formSchemaUpdatePlayer = z.object({
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