import express, { NextFunction, Request, Response } from "express";
import { createcolor } from "../controllers/color-conroller/create-color.controller";
import { deletecolor } from "../controllers/color-conroller/delete-color.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";
import { getcolorById } from "../controllers/color-conroller/get-color-by-id.controller";
import { getAllColors } from "../controllers/color-conroller/get-all-colors.controller";
import { updateColor } from "@controllers/color-conroller/update-color";


const router = express.Router();


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

router.put(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next)
  },
  (req, res, next) => {
    authorizeRole(["ADMIN", "SUPER_ADMIN"])(req, res, next)
  },
  (req, res) => {
    updateColor(req, res)
  }
)

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
