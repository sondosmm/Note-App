const { modelName } = require("../models/NoteModel");

const globalError =(err, req, res, next) => {
  console.error("ERROR DETAILS:", err);

  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Something went wrong",
    stack: err.stack, // optional — remove in production
  });
}


module.exports = globalError;