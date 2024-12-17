import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import express, { Express } from "express"
import router from "./todo/todoRoute"
import auth from "./auth/authRoute"
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"

export const db = drizzle(process.env.DB_FILE_NAME!); // Initialize the database connection

const app: Express = express(); // Create an Express application instance

const options = { // Define the Swagger API documentation options
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'todo-api',
            version: '1.0.0',
        },
    },
    apis: ['./src/auth/authRoute.ts', './src/todo/todoRoute.ts',], // Specify the API routes to include in the documentation
};

const swaggerDocument = swaggerJsdoc(options); // Generate the Swagger API documentation

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Serve the Swagger API documentation at /api-docs

app.use(express.json()) // Enable JSON parsing for incoming requests

app.use("/tasks", router)

app.use("/auth", auth)

const port = process.env.PORT

app.listen(port || 3000, () => {
    console.log("server is running on port :", port || 3000)
})
