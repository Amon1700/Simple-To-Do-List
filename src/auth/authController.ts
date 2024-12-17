import { Request, Response } from "express";
import authService from "./authService";
import { registerValidation, loginValidation } from "../validation/validation";

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const validData = registerValidation.parse(req.body) // Validate user registration data
            const result = await authService.register(validData) // Validate user registration data
            if (result instanceof Error)
                res.status(400).send({ message: result.message }) // Return error message if registration fails
            else
                res.status(200).send(result) // Return successful registration result
        } catch (error) {
            res.status(400).send(error) // Catch and return any unexpected errors     
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            loginValidation.parse(req.body) // Validate user login data
            const result = await authService.login(req.body) // Attempt to login the user
            if (result instanceof Error)
                res.status(400).send({ message: result.message }) // Return error message if login fails
            else
                res.status(200).send(result) // Return successful login result (token)
        } catch (error) {
            res.status(400).send(error) // Catch and return any unexpected errors   
        }
    },

    getUsers: async (req: Request, res: Response) => {
        try {
            const result = await authService.getUser() // Attempt to retrieve users
            if (result instanceof Error)
                res.status(400).send(result) // Return error message if retrieval fails
            else
                result.length ? res.status(200).send(result) : res.status(400).send({ message: "users not found" }) // Return users if found, or a "not found" message if empty
        } catch (error) {
            res.status(400).send(error) // Catch and return any unexpected errors  
        }
    }
}

export default authController