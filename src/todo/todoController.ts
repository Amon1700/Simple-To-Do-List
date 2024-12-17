import { Request, Response } from "express";
import { idValidation, statusValidation, taskValidation } from "../validation/validation"
import todoService from "./todoService";


interface authRequest extends Request { // Extend the Request interface to include an optional id property
    id?: string;
}

const todoController = {

    addTask: async (req: authRequest, res: Response): Promise<void> => {
        try {
            const validTask = taskValidation.parse(req.body) // Validate the task data
            const validUserId = idValidation.parse(req.id) // Validate the user id
            const result = await todoService.addTask(validTask, validUserId) // Add the task
            if (result instanceof Error) 
                res.status(400).send({ message: result.message }) // Handle the error
            else
                res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error) // Catch and return any errors
        }
    },

    getTask: async (req: authRequest, res: Response): Promise<void> => {
        try {
            const validUserId = idValidation.parse(req.id) // Validate the user id
            const result = await todoService.getTask(validUserId) // Get the tasks
            if (result instanceof Error)
                res.status(400).send({ message: result.message }) // Handle the error
            else
                result.length ? res.status(200).send(result) : res.status(400).send({ message: "tasks not found" })
        } catch (error) {
            res.status(400).send(error) // Catch and return any errors
        }
    },

    getTaskById: async (req: authRequest, res: Response): Promise<void> => {
        try {
            const validTaskId = idValidation.parse(req.params.id)
            const validUserId = idValidation.parse(req.id) // Validate the user id
            const result = await todoService.getTaskById(validTaskId, validUserId) // Get the task
            if (result instanceof Error)
                res.status(400).send({ message: result.message }) // Handle the error
            else
                result ? res.status(200).send(result) : res.status(400).send({ message: "task not found" })
        } catch (error) {
            res.status(400).send(error) // Catch and return any errors
        }
    },

    updateTaskById: async (req: authRequest, res: Response): Promise<void> => {
        try {
            const validTaskId = idValidation.parse(req.params.id) // Validate the task id
            const validUserId = idValidation.parse(req.id) // Validate the user id
            const validStatus = statusValidation.parse(req.body.status) // Validate the status
            const result = await todoService.updateTaskById(validTaskId, validUserId, validStatus) // Update the task
            if (result instanceof Error)
                res.status(400).send({ message: result.message }) // Handle the error
            else
                result ? res.status(200).send(result) : res.status(400).send({ message: "task not found" })
        } catch (error) {
            res.status(400).send(error)
        }
    },

    deleteTaskById: async (req: authRequest, res: Response): Promise<void> => {
        try {
            const validTaskId = idValidation.parse(req.params.id) // Validate the task id
            const validUserId = idValidation.parse(req.id) // Validate the user id
            const result = await todoService.deleteTaskById(validTaskId, validUserId)  // Delete the task
            if (result instanceof Error)
                res.status(400).send({ message: result.message }) // Handle the error
            else
                result ? res.status(200).send(result) : res.status(400).send({ message: "task not found" })

        } catch (error) {
            res.status(400).send(error) // Catch and return any errors
        }
    }
}

export default todoController