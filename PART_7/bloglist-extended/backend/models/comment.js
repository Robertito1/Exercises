const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  blog:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
  }
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Comment", commentSchema);
