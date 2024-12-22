import { Request, Response } from "express";
import { Color } from "../../models/color.model";

export const createcolor = async (req: Request, res: Response) => {
  try {
    const { color, quote } = req.body;

    const newcolor = new Color({
      color,
      quote,
      createdBy: req.user?.id,
    });

    await newcolor.save();

    res
      .status(201)
      .json({ message: "color created successfully", color: newcolor });
  } catch (error) {
    console.error("Error creating color:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
