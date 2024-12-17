import { Router } from "express";
import authController from "./authController";
const router = Router()

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: 12345678
 *                 
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

router.post("/register", authController.register)

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: 12345678
 *                 
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
 */

router.post("/login", authController.login)

/**
 * @openapi
 * /auth/getusers:
 *   get:
 *     tags:
 *       - auth
 *     summary: Fetch all users
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       400:
 *         description: Bad request
 */

router.get("/getusers", authController.getUsers)

export default router