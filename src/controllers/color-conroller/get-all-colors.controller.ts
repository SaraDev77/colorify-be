import { Request, Response } from "express";
import { Color } from "../../models/color.model";

export const getAllColors = async (req: Request, res: Response) => {
  try {
    // Extract query parameters with defaults and validation
    const page = parseInt(req.query.page as string, 10) || 1; // Defaults to 1 if not a number
    const perPage = parseInt(req.query.perPage as string, 10) || 10;
    const skip = (page - 1) * perPage;

    // Fetch total count of documents
    const total = await Color.countDocuments();

    // Fetch paginated results
    const colors = await Color.find()
      .skip(skip)
      .limit(perPage);

    // Return paginated data and metadata
    res.status(200).json({
      colors,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    console.error("Error fetching colors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
