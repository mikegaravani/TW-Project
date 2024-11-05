const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: String,
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: Date, // This triggers the calendar activity
});

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    default: "Untitled Note",
  },
  content: {
    type: String,
  },
  category: {
    type: String,
    default: "General",
  },
  private: {
    type: Boolean,
    default: false,
  },
  openTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isList: {
    // needed for bullet note lists
    type: Boolean,
    default: false,
  },
  tasks: [taskSchema],
  created: {
    type: Date,
    default: Date.now(),
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Note", noteSchema);
