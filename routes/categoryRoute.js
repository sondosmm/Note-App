const express = require("express");
const auth = require("../middleware/auth");
const upload= require("../middleware/uploadImage");

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.route("/").get(auth, getCategories).post(auth,upload.single("image"), createCategory);
router
  .route("/:id")
  .get(auth, getCategory)
  .put(auth,upload.single("image"), updateCategory)
  .delete(auth, deleteCategory);

module.exports = router;
