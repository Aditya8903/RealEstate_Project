import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Error not found"));
  }

  if (req.user.id !== listing.useRef) {
    return next(errorHandler(401, "Unauthorized to update other listing"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
