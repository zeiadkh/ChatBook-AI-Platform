import mongoose, { Schema, model } from "mongoose";

const bookSchema = new Schema({
  bookName: {
    type: String,
    required: true,
    minlength: 3,
  },
  author: {
    type: String,
    required: true,
    minlength: 3,
  },
  cover: {
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/dtp47o37p/image/upload/v1691265763/e-commerce/defaults/png-transparent-default-avatar-thumbnail_mojudr.png",
    },
    id: {
      type: String,
      default:
        "e-commerce/defaults/png-transparent-default-avatar-thumbnail_mojudr",
    },
  },
  book: {
    url: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default:
        "e-commerce/defaults/png-transparent-default-avatar-thumbnail_mojudr",
    },
  },
  description: { type: String, minlength: 10, required: true },
});
bookSchema.query.paginate = function (page) {
  page = !page || page < 1 || isNaN(page) ? 1 : page;
  const limit = 6;
  return this.skip(limit * (page - 1)).limit(limit);
};

bookSchema.query.selection = function (feilds) {
  if (!feilds) return this;
  const modelKeys = Object.keys(bookSchema.paths);
  const feildsArray = feilds.split(" ");
  feilds = feildsArray.filter(
    (feild) =>
      modelKeys.includes(feild) || modelKeys.includes(feild.split("-")[1])
  );
  return this.select(feilds);
};
const Book = mongoose.model.Book || model("Book", bookSchema);
export default Book;
