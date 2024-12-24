import { Request, Response } from "express";
import { Color } from "../../models/color.model";

export const getAllColors = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const perPage = parseInt(req.query.perPage as string, 10) || 10;
    const search = (req.query.search as string)?.toLowerCase() || "";
    const skip = (page - 1) * perPage;

   
    const filter = search
      ? { quote: { $regex: search, $options: "i" } } 
      : {};

    // Fetch total count of matching documents
    const total = await Color.countDocuments(filter);

    // Fetch paginated and filtered results
    const colors = await Color.find(filter)
      .skip(skip)
      .limit(perPage);


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
