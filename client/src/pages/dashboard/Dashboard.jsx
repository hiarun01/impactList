// ...existing imports...
import React, {useEffect, useState} from "react";
import UserInputSection from "./components/userInputSection";
import {ChevronDown, ChevronUp} from "lucide-react";
import {getPosts, updateVote} from "@/services/api";

const Dashboard = () => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getPosts();
      setPostData(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (id, vote) => {
    try {
      // Optimistically update UI
      setPostData((prev) =>
        prev.map((post) =>
          post._id === id
            ? {
                ...post,
                votes:
                  typeof post.votes === "number"
                    ? vote === "up"
                      ? post.votes + 1
                      : post.votes - 1
                    : vote === "up"
                    ? 1
                    : -1,
              }
            : post
        )
      );
      await updateVote(id, vote);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <UserInputSection />
      <div>
        {loading ? (
          <div className="text-center py-10 text-lg font-semibold text-blue-600">
            Loading...
          </div>
        ) : (
          <ul className="max-w-3xl flex justify-center flex-col mx-auto gap-5 p-5">
            {postData.map((post, index) => {
              const {
                title,
                description,
                username,
                xUsername,
                resourceUrl,
                category,
              } = post;
              return (
                <li
                  key={post._id}
                  className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-2 p-4 sm:p-5"
                >
                  {/* Content Section */}
                  <div className="flex-1 min-w-0 pr-0 sm:pr-20">
                    <div className="flex flex-wrap items-center gap-2 mb-2"></div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 break-words flex gap-2 items-center">
                      <span className="text-xs bg-black text-white px-3 py-2 rounded-full font-semibold">
                        # {index + 1}
                      </span>{" "}
                      {title}
                    </h2>
                    <p className="text-gray-700 mt-1 break-words">
                      {description}
                    </p>
                    <div className="space-x-3 gap-2 mt-3 flex-wrap">
                      <span className="text-sm text-gray-500">
                        <span className="font-semibold">By:</span>{" "}
                        {xUsername ? (
                          <a
                            href={`https://twitter.com/${xUsername}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {username}
                          </a>
                        ) : (
                          username
                        )}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                        {category}
                      </span>
                      {resourceUrl && (
                        <a
                          href={resourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline ml-auto"
                        >
                          Resource
                        </a>
                      )}
                    </div>
                  </div>
                  {/* Vote Section: vertical on desktop, horizontal on mobile */}
                  <div
                    className="
      flex sm:flex-col items-center justify-center
      gap-2 sm:gap-1
      sm:absolute sm:right-5 sm:top-1/2 sm:-translate-y-1/2
      mt-4 sm:mt-0
      bg-gray-50 sm:bg-transparent rounded-lg px-2 py-2 sm:p-0
      w-full sm:w-auto
    "
                  >
                    <button
                      className="p-2 rounded-full hover:bg-blue-100 transition"
                      onClick={() => handleVote(post._id, "up")}
                      aria-label="Upvote"
                    >
                      <ChevronUp className="w-6 h-6 text-blue-600" />
                    </button>
                    <span className="text-lg font-bold text-gray-800 px-2">
                      {typeof post.votes === "number" ? post.votes : 0}
                    </span>
                    <button
                      className="p-2 rounded-full hover:bg-blue-100 transition"
                      onClick={() => handleVote(post._id, "down")}
                      aria-label="Downvote"
                    >
                      <ChevronDown className="w-6 h-6 text-blue-600" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
