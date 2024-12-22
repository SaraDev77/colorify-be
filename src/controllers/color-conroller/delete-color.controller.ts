import { Request, Response } from "express";
import { Color } from "../../models/color.model";

export const deletecolor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const color = await Color.findById(id);
    if (!color) {
      return res.status(404).json({ message: "color not found" });
    }

    await color.deleteOne();
    res.status(200).json({ message: "color deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
