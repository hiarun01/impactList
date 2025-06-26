import {GET_POSTS_API, POST_API, VOTE_API} from "@/constants/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getPosts = async () => {
  return await api.get(GET_POSTS_API, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addPost = async (form) => {
  return await api.post(POST_API, form, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateVote = async (id, vote) => {
  return await api.post(
    VOTE_API,
    {id, vote},
    {headers: {"Content-Type": "application/json"}}
  );
};
