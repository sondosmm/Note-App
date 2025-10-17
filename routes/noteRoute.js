const express = require("express");
const auth = require("../middleware/auth");
const upload= require("../middleware/uploadImage");

const {
  getNote,
  getNotes,
  createNote,
  updateNote,
  deleteNote
} = require("../controllers/NoteController");
const router = express.Router();

router.route("/").get(auth, getNotes).post(auth,upload.single("image"), createNote);
router
  .route("/:id")
  .get(auth, getNote)
  .put(auth,upload.single("image"), updateNote)
  .delete(auth, deleteNote);

module.exports = router;
