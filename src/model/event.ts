import mongoose from "mongoose";

const Event = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "must provide event type"],
      enum: {
        values: ["event"],
        message: "{VALUE} is not supported",
      },
      default: "event",
    },
    uid: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide an user"],
      immutable: true,
    },
    name: {
      type: String,
      required: [true, "must provide event name"],
      minLength: 3,
      maxLength: 50,
    },
    tagline: {
      type: String,
      required: [true, "must provide event tagline"],
      minLength: 3,
      maxLength: 50,
    },
    schedule: {
      type: Date,
      required: [true, "must provide event date and time"],
    },
    description: {
      type: String,
      required: [true, "please provide event description"],
      minLength: 6,
      maxLength: 200,
    },
    image: String,
    // moderator: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "must a moderator"],
    // },
    moderator: {
      type: String,
      required: [true, "must provide a moderator"],
    },
    //TODO: correct category
    // category: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Category",
    //   required: [true, "must provide a category for the event"],
    // },
    // subcategory: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "SubCategory",
    // },
    category: {
      type: String,
      required: [true, "please provide category name"],
      minLength: 3,
      maxLength: 15,
    },

    subcategory: {
      type: String,
      minLength: 3,
      maxLength: 15,
    },

    rigor_rank: {
      type: Number,
      min: [1, "rank too less"],
      max: [10, "rank too high"],
      required: [true, "rigor_rank cannot be empty"],
      default: 1,
    },
    attendees: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Event", Event);
