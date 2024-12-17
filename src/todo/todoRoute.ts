import { Router } from "express";
import todoController from "./todoController"
import authMiddleware from "../middleware/authMiddleware";
const router = Router()


/**
 * @openapi
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /tasks:
 *   post:
 *     tags:
 *       - tasks
 *     summary: Create a new task
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task created successfully
 *       400:
 *         description: Bad request
 */

router.post("/", authMiddleware, todoController.addTask);

/**
 * @openapi
 * /tasks:
 *   get:
 *     tags:
 *       - tasks
 *     summary: Fetch all tasks
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *       400:
 *         description: Bad request
 */

router.get("/", authMiddleware, todoController.getTask)

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     tags:
 *       - tasks
 *     summary: Fetch a task by its ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task fetched successfully
 *       400:
 *         description: Bad request
 */

router.get("/:id", authMiddleware, todoController.getTaskById)


/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     tags:
 *       - tasks
 *     summary: Update the task status.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: completed
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *       400:
 *         description: Bad request
 */

router.put("/:id", authMiddleware, todoController.updateTaskById)

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     tags:
 *       - tasks
 *     summary: Delete a task by its ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       400:
 *         description: Bad request
 */

router.delete("/:id", authMiddleware, todoController.deleteTaskById)

export default router