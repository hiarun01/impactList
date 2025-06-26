import {Router} from "express";
import {getPosts, post, userVote} from "../controllers/post.controller.js";

export const postRoutes = Router();

postRoutes.post("/post", post);
postRoutes.get("/posts", getPosts);
postRoutes.post("/vote", userVote);
