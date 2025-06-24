import Post from "../models/post.model.js";

export const post = async (req, res) => {
  try {
    const {
      title,
      descrption,
      username,
      twitterUsername,
      resourceUrl,
      category,
    } = req.body;

    // Validate required fields
    if (!title || !descrption || !username || !twitterUsername || !category) {
      return res.status(400).json({message: "All fields are required"});
    }

    const post = new Post({
      title,
      descrption,
      username,
      twitterUsername,
      resourceUrl,
      category,
    });

    await post.save();

    return res.status(201).json({
      message: "Post created successfully",
      post: {
        id: post._id,
        title: post.title,
        descrption: post.descrption,
        username: post.username,
        twitterUsername: post.twitterUsername,
        resourceUrl: post.resourceUrl,
        category: post.category,
      },
    });
  } catch (error) {
    console.error("Error in post controller:", error);
    return res.status(500).json({message: "Internal server error"});
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({createdAt: -1}); //
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error while getting posts", error);
    return res.status(500).json({message: "Internal server error"});
  }
};
