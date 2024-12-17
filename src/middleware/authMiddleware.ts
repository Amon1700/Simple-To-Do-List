import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { db } from "../index"
import { userTable } from "../db/schema"
import { eq } from "drizzle-orm";

interface authRequest extends Request { // Extend the Request interface to include an optional id property
    id?: string;
}

const authMiddleware = async (req: authRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] // Extract the token
        if (token) {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)  // Verify the token using the JWT secret
            req.id = decoded.id  // Set the id property on the request object
            const check = await db.select().from(userTable).where(eq(userTable.id, decoded.id))
            if (!check.length) {  // Check if the user exists in the database
                res.status(400).send({ message: "user not found" })
            }
            next() // If the user is found, call the next function
        }
        else {
            res.status(400).send({ message: "provide token" }) // If no token is provided return an error
        }
    } catch (error) {
        res.status(400).send({ message: "invalid token" }) // If the token is invalid return an error
    }
}

export default authMiddleware