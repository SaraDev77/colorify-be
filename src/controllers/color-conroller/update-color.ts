import { Color } from "@models/color.model";
import { Request, Response } from "express";

export const updateColor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { color, quote } = req.body;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Find the color by ID
    const colorData = await Color.findById(id);
    if (!colorData) {
      return res
        .status(404)
        .json({ message: "Color not found", errorCode: "COLOR_NOT_FOUND" });
    }

    // Update allowed fields
    if (quote !== undefined) colorData.quote = quote;
    if (color !== undefined) colorData.color = color;

    // Save the updated document
    const updatedColor = await colorData.save();

    res.status(200).json({
      message: "Color Quote's updated successfully",
      color: updatedColor,
    });
  } catch (error) {
    console.error("Error updating color:", error); // Log the actual error
    res.status(500).json({ message: "Internal Server Error" });
  }
};
