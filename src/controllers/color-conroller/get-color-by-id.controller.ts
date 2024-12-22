import { Request, Response } from "express";
import { Color } from "../../models/color.model";

export const getcolorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the color by ID and populate the creator's email
    const color = await Color.findById(id);
    if (!color) {
      return res
        .status(404)
        .json({ message: "color not found", errorCode: "COLOR_NOT_FOUND" });
    }

    res.status(200).json({ color });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
