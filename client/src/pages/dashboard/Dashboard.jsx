import React, {useEffect, useState} from "react";
import UserInputSection from "./components/userInputSection";
import {ChevronDown, ChevronUp} from "lucide-react";
import {getPosts, updateVote} from "@/services/api";
import {toast} from "sonner";

const Dashboard = () => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("all");
  const [votedPosts, setVotedPosts] = useState([]);

  const filteredPosts =
    category === "all"
      ? postData
      : postData.filter((post) => post.category === category);

  const sortedPosts = [...filteredPosts].sort(
    (a, b) => (b.votes || 0) - (a.votes || 0)
  );

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
    // Prevent voting again in this session
    if (votedPosts.includes(id)) {
      toast.error("You have already voted on this post.");
      return;
    }

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

    try {
      await updateVote(id, vote);
      setVotedPosts((prev) => [...prev, id]);
      toast.success("Vote submitted!");
    } catch (error) {
      setPostData((prev) =>
        prev.map((post) =>
          post._id === id
            ? {
                ...post,
                votes:
                  typeof post.votes === "number"
                    ? vote === "up"
                      ? post.votes - 1
                      : post.votes + 1
                    : 0,
              }
            : post
        )
      );
      if (error.response && error.response.status === 403) {
        setVotedPosts((prev) => [...prev, id]);
        toast.error("You have already voted on this post.");
      } else {
        toast.error("Error voting. Please try again.");
        console.error("Error voting:", error);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <UserInputSection category={category} setCategory={setCategory} />
      <div>
        {loading ? (
          <div className="text-center py-10 text-lg font-semibold text-black">
            Loading...
          </div>
        ) : (
          <ul className="max-w-3xl flex justify-center flex-col mx-auto gap-5 p-5">
            {sortedPosts.length === 0 ? (
              <h2 className="text-center"> Not Found</h2>
            ) : (
              sortedPosts.map((post, index) => {
                const {
                  title,
                  description,
                  fullName,
                  xUsername,
                  resourceUrl,
                  category,
                } = post;
                const alreadyVoted = votedPosts.includes(post._id);
                return (
                  <li
                    key={post._id}
                    className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-2 p-4 sm:p-5"
                  >
                    {/* Content Section */}
                    <div className="flex-1 min-w-0 pr-0 sm:pr-20">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 break-words flex gap-2 items-center">
                        <span className="text-xs bg-black text-white px-3 py-2 rounded-full font-semibold">
                          # {index + 1}
                        </span>
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
                              {fullName}
                            </a>
                          ) : (
                            fullName
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
                    {/* Vote Section */}
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
                        className="p-2 rounded-full transition bg-blue-100"
                        onClick={() => handleVote(post._id, "up")}
                        aria-label="Upvote"
                        disabled={alreadyVoted}
                      >
                        <ChevronUp className="w-6 h-6" />
                      </button>
                      <span className="text-lg font-bold text-gray-800 px-2">
                        {typeof post.votes === "number" ? post.votes : 0}
                      </span>
                      <button
                        className="p-2 rounded-full transition bg-red-100"
                        onClick={() => handleVote(post._id, "down")}
                        aria-label="Downvote"
                        disabled={alreadyVoted}
                      >
                        <ChevronDown className="w-6 h-6" />
                      </button>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
