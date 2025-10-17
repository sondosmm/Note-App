const mongoose = require("mongoose");

//create schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category is required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Category name is too short"],
      maxlength: [32, "Category name is too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

//create model

const CategoryModel = mongoose.model("Category", categorySchema);


module.exports = CategoryModel;