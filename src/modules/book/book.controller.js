import Book from "../../../DB/models/book.model.js";
import cloudinary from "../../utils/cloudinary.js";

export const create = async (req, res, next) => {
  if (!req.files.book || !req.files.cover)
    return next(
      new Error("You must provide a book and a cover to add", { cause: 400 })
    );

  const { secure_url: book_url, public_id: bookPublic_id } =
    await cloudinary.uploader.upload(req.files.book[0].path, {
      folder: `${process.env.cloud_folder}/books`,
    });
  const { secure_url: cover_url, public_id: coverPublic_id } =
    await cloudinary.uploader.upload(req.files.cover[0].path, {
      folder: `${process.env.cloud_folder}/covers`,
    });
  const result = await Book.create({
    ...req.body,
    book: { url: book_url, id: bookPublic_id },
    cover: { url: cover_url, id: coverPublic_id },
  });
  console.log(cover_url, book_url);
  return res.status(201).json({ sucess: true, results: result });
};

export const update = async (req, res, next) => {
  const result = await Book.findById(req.params.bId);
  if (!result) return next(new Error("Book not found"));

  const { bookName, author, description } = req.body;

  result.bookName = bookName ? bookName : result.bookName;
  result.author = author ? author : result.author;
  result.description = description ? description : result.description;

  if (req.files) {
    if (req.files.book) {
      const { book_url } = await cloudinary.uploader
        .upload(req.files.book[0].path, {
          public_id: result.book.id,
        })
        .catch((err) => console.log(err));
      result.book.url = book_url;
      await result.save();
    } else if (req.files.cover) {
      const { secure_url: cover_url } = await cloudinary.uploader
        .upload(req.files.cover[0].path, {
          public_id: result.cover.id,
        })
        .catch((err) => console.log(err));
      result.cover.url = cover_url;
      await result.save();
    }
  } else return;

  await result.save();

  return res
    .status(200)
    .json({ sucess: true, message: "book updated", results: result });
};

export const deleteBook = async (req, res, next) => {
  const result = await Book.findById(req.params.bId);
  if (!result) return next(new Error("Book not found", { cause: 404 }));
  const cloudObjId = [result.book.id, result.cover.id];
  await cloudinary.api.delete_resources(cloudObjId);
  await Book.findByIdAndDelete(req.params.bId);
  return res.json({ success: true, message: "book deleted successfully" });
};

export const get = async (req, res, next) => {
  const { feilds, page, sortBy } = req.query;
  const keyword = req.query.keyword || /[a-zA-Z0-9]/;
  const books = await Book.find({
    $or: [
      { bookName: { $regex: keyword, $options: "i" } },
      { author: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ],
  })
    .paginate(page)
    .selection(feilds)
    .sort(sortBy);
  if (!books || books.length <= 0)
    return next(new Error("Book not found", { cause: 404 }));
  return res.json({ success: true, message: books });
};

export const getSingleBook = async (req, res, next) => {
  const id = req.params.bId;
  const result = await Book.findById(id);
  if (!result) return next(new Error("Book not found", { cause: 404 }));
  return res.json({ success: true, message: result });
};
