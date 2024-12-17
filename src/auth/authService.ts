import { db } from "../index"
import { userTable } from "../db/schema"
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken"

interface user {
    name: string
    email: string
    password: string
}

const authService = {
    register: async (data: user): Promise<{ message: string } | Error> => {
        try {
            const check = await db.select().from(userTable).where(eq(userTable.email, data.email)) // Check if the email already exists

            if (check[0]) {
                return new Error("email already exist")
            }

            const newUser = {
                id: uuidv4(),
                name: data.name,
                email: data.email,
                password: await bcrypt.hash(data.password, 12)
            } // Create a new user

            await db.insert(userTable).values(newUser)  // Insert the new user into the database

            return { message: "user is registered you can login now" }
        } catch (error) {
            return new Error(error instanceof Error ? error.message : "registration failed") // Catch and return any errors
        }
    },

    login: async (data: user): Promise<{ token: string } | Error> => {

        try {
            const result = await db.select().from(userTable).where(eq(userTable.email, data.email))  // Find the user by email

            if (!result[0]) {
                return new Error("user not found") // Return error if user not found
            }

            const check = await bcrypt.compare(data.password, result[0].password) // Compare the provided password with the stored password


            if (!check) {
                return new Error("incorrect password") // Return error if password is incorrect
            }

            const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET!, { expiresIn: "1h" }) // Generate a JWT token

            return { token } // Return the token
        } catch (error) {
            return new Error(error instanceof Error ? error.message : "login failed") // Catch and return any errors
        }

    },

    getUser: async () => {
        try {
            const result = await db.select().from(userTable) // Select all users from the database
            return result
        } catch (error) {
            return new Error(error instanceof Error ? error.message : "not able to fetch users") // Catch and return any errors
        }
    }
}

export default authService