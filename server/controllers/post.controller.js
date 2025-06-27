import Post from "../models/post.model.js";

export const post = async (req, res) => {
  try {
    const {title, description, username, xUsername, resourceUrl, category} =
      req.body;

    // Validate required fields
    if (!title || !description || !username || !xUsername || !category) {
      return res.status(400).json({message: "All fields are required"});
    }

    const post = new Post({
      title,
      description,
      username,
      xUsername,
      resourceUrl,
      category,
    });

    await post.save();

    return res.status(201).json({
      message: "Post created successfully",
      post: {
        id: post._id,
        title: post.title,
        description: post.description,
        username: post.username,
        xUsername: post.xUsername,
        resourceUrl: post.resourceUrl,
        category: post.category,
      },
    });
  } catch (error) {
    console.error("Error in post controller:", error);
    return res.status(500).json({message: "Internal server error"});
  }
};

// get post api

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({createdAt: -1}); //
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error while getting posts", error);
    return res.status(500).json({message: "Internal server error"});
  }
};

// vote api

export const userVote = async (req, res) => {
  try {
    const {id, vote} = req.body;
    // Get IP address (works for most setups)
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.connection.remoteAddress;

    if (!id || !["up", "down"].includes(vote)) {
      return res.status(400).json({message: "Invalid vote data"});
    }

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({message: "Post not found"});

    // Check if IP has already voted
    if (post.votedIPs.includes(ip)) {
      return res
        .status(403)
        .json({message: "You have already voted on this post."});
    }

    // Update votes
    if (typeof post.votes !== "number") post.votes = 0;
    if (vote === "up") post.votes += 1;
    else post.votes -= 1;

    // Add IP to votedIPs
    post.votedIPs.push(ip);

    await post.save();

    return res.status(200).json({message: "Vote counted", votes: post.votes});
  } catch (error) {
    console.error("Error while voting:", error);
    return res.status(500).json({message: "Internal server error"});
  }
};
