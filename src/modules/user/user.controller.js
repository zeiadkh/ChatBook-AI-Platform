import User from "../../../DB/models/user.model.js";
import Book from "../../../DB/models/book.model.js"
export const getUserInfo = async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("favourites.id");
  if (!user) return next(new Error("User not found"));
  return res.status(200).json({ success: true, result: user });
};

export const addFavourite = async (req, res, next) => {
    const { bId } = req.params;
    const user = await User.findById(req.user._id);
    const book = await Book.findById(bId)
  
    if (!book) return next(new Error("Book not found"))
    if (!user) return next(new Error("User not found"))
  
    if(!user.favourites.length) user?.favourites.push({ id: bId })
    else {
      const existingFavourite = user.favourites.find(item => item.id.toString() === bId);
      if (existingFavourite) {
        return res
          .status(400)
          .json({ success: false, message: "Item already added to favorites" });
      } else {
        user?.favourites.push({ id: bId });
      }
    }
  
    await user.save();
  
    return res
      .status(201)
      .json({ success: true, message: "Book Added to favourites list" });
  };

export const removeFavourite = async (req, res, next) => {
  const { bId } = req.params;
  const user = await User.findById(req.user._id);
  if (!user) return next(new Error("User not found"));
  console.log(user.favourites.length);
  if (user.favourites.length === 0)
    return next(new Error("No Favourites to remove"));
  user.favourites.map((item) => {
    console.log(item.id.toString(), bId, item);
    item.id.toString() !== bId
      ? next(new Error("Item not a favourite"))
      : (user.favourites = user?.favourites.filter(
          (item) => item.id.toString() !== bId
        ));
  });

  await user.save();
  return res
    .status(200)
    .json({ success: true, message: "Book removed from favourites list" });
};
