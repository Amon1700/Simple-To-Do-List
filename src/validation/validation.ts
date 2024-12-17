import { z } from "zod"

export const taskValidation = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty()
})

export const statusValidation = z.enum(["pending", "in-progress", "completed"])

export const idValidation = z.string().uuid()

export const registerValidation = z.object({
    name: z.string().nonempty(),
    email: z.string().nonempty().email(),
    password: z.string().nonempty().min(8)
})

export const loginValidation = z.object({
    email: z.string().nonempty().email(),
    password: z.string().nonempty().min(8)
})