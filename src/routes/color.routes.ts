import express, { NextFunction, Request, Response } from "express";
import { createcolor } from "../controllers/color-conroller/create-color.controller";
import { deletecolor } from "../controllers/color-conroller/delete-color.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";
import { getcolorById } from "../controllers/color-conroller/get-color-by-id.controller";
import { getAllColors } from "../controllers/color-conroller/get-all-colors.controller";

const router = express.Router();

/**
 * @swagger
 * /api/colors:
 *   get:
 *     summary: Get all colors with pagination
 *     tags:
 *       - colors
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Zero-indexed page number
 *         required: false
 *         schema:
 *           type: integer
 *       - name: perPage
 *         in: query
 *         description: Number of colors per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of colors with pagination metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 colors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/color'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     perPage:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/colors:
 *   post:
 *     summary: Create a new color
 *     tags:
 *       - colors
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
 *               deadline:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: color created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 color:
 *                   $ref: '#/components/schemas/color'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/colors/{id}:
 *   get:
 *     summary: Get a single color by ID
 *     tags:
 *       - colors
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the color to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: color retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 color:
 *                   $ref: '#/components/schemas/color'
 *       404:
 *         description: color not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/colors/{id}:
 *   put:
 *     summary: Edit a color
 *     tags:
 *       - colors
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the color to edit
 *         schema:
 *           type: string
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
 *               deadline:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: color updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 color:
 *                   $ref: '#/components/schemas/color'
 *       404:
 *         description: color not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/colors/{id}/start:
 *   post:
 *     summary: Start a color
 *     tags:
 *       - colors
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the color to start
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: color started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 color:
 *                   $ref: '#/components/schemas/color'
 *       404:
 *         description: color not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/colors/{id}/complete:
 *   post:
 *     summary: Mark a color as completed
 *     tags:
 *       - colors
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the color to mark as completed
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: color marked as completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 color:
 *                   $ref: '#/components/schemas/color'
 *       404:
 *         description: color not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/colors/{id}:
 *   delete:
 *     summary: Delete a color
 *     tags:
 *       - colors
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the color to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: color deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: color not found
 *       500:
 *         description: Internal Server Error
 */

router.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next);
  },
  (req, res, next) => {
    authorizeRole(["ADMIN", "SUPER_ADMIN"])(req, res, next);
  },
  createcolor
);

router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next);
  },
  (req, res, next) => {
    authorizeRole(["ADMIN", "SUPER_ADMIN"])(req, res, next);
  },
  getAllColors
);
router.delete(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next);
  },
  (req, res, next) => {
    authorizeRole(["SUPER_ADMIN"])(req, res, next);
  },
  (req, res) => {
    deletecolor(req, res);
  }
);
router.get(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next);
  },
  (req, res, next) => {
    authorizeRole(["ADMIN", "SUPER_ADMIN"])(req, res, next);
  },
  (req, res) => {
    getcolorById(req, res);
  }
);

export default router;
