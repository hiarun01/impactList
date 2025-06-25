import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    xUsername: {
      type: String,
      required: true,
    },
    resourceUrl: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("posts", postSchema);

export default Post;
