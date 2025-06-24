import {GET_POSTS_API} from "@/constants/constants";
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
