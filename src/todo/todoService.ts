import { db } from "../index"
import { todoTable, userTable } from "../db/schema"
import { v4 as uuidv4 } from 'uuid';
import { and, eq } from "drizzle-orm";

interface todo {
    id: string
    title: string
    description: string
    status: string
    user_id: string
}

const todoService = {
    addTask: async (data: Pick<todo, 'title' | 'description'>, user_id: string): Promise<todo | Error> => {
        try {
            const newTask = { // Create a new task object
                id: uuidv4(),
                title: data.title,
                description: data.description,
                user_id: user_id,
            }
            const result = await db.insert(todoTable).values(newTask).returning() // Insert the new todo into the database
            return result[0]
        } catch (error) {
            return new Error(error instanceof Error ? error.message : "not able to add task")  // Catch and return any errors
        }
    },

    getTask: async (user_id: string): Promise<todo[] | Error> => {
        try {
            const result = await db.select().from(todoTable).where(eq(todoTable.user_id, user_id))
            return result // Return the tasks
        } catch (error) {
            return new Error(error instanceof Error ? error.message : "not able to fetch tasks")  // Catch and return any errors
        }
    },

    getTaskById: async (id: string, user_id: string): Promise<todo | Error> => {
        try {
            const result = await db.select().from(todoTable).where(and(eq(todoTable.id, id), eq(todoTable.user_id, user_id)))
            return result[0] // Return the task
        } catch (error) {
            return new Error(error instanceof Error ? error.message : "not able to fetch task")  // Catch and return any errors
        }
    },

    updateTaskById: async (id: string, user_id: string, status: string): Promise<todo | Error> => {
        try {
            const result = await db.update(todoTable).set({ status: status }).where(and(eq(todoTable.id, id), eq(todoTable.user_id, user_id))).returning()
            return result[0] // Return the updated task 
        } catch (error) {
            return new Error(error instanceof Error ? error.message : "not able to update task")  // Catch and return any errors
        }
    },

    deleteTaskById: async (id: string, user_id: string): Promise<todo | Error> => {
        try {
            const result = await db.delete(todoTable).where(and(eq(todoTable.id, id), eq(todoTable.user_id, user_id))).returning()
            return result[0] // Return the deleted task
        } catch (error) {
            return new Error(error instanceof Error ? error.message : "not able to delete task")  // Catch and return any errors
        }
    }
}

export default todoService
