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

    fullName: {
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
    votes: {type: Number, default: 0},
    votedIPs: {type: [String], default: []},
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("posts", postSchema);

export default Post;
