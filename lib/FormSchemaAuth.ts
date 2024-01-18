import { z } from "zod"

export const formSchemaAuth = z.object({
  email: z.string()
  .min(2, {
    message: "Nome must be at least 2 characters.",
  }),
  password: z.string()
  .min(2, {
    message: "Apelido must be at least 2 characters.",
  })
  
  })