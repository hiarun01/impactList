import React, {useEffect, useState} from "react";
import UserInputSection from "./components/userInputSection";
import {ChevronDown, ChevronUp} from "lucide-react";
import {getPosts, updateVote} from "@/services/api";
import {toast} from "sonner";

const Dashboard = () => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("all");
  const [votedPosts, setVotedPosts] = useState(new Map()); // Track vote type per post
  const [votingInProgress, setVotingInProgress] = useState(new Set()); // Track loading states

  const filteredPosts =
    category === "all"
      ? postData
      : postData.filter((post) => post.category === category);

  const sortedPosts = [...filteredPosts].sort(
    (a, b) => (b.votes || 0) - (a.votes || 0)
  );

  // Load voted posts from localStorage on component mount
  useEffect(() => {
    const savedVotes = localStorage.getItem("userVotes");
    if (savedVotes) {
      try {
        const parsedVotes = JSON.parse(savedVotes);
        setVotedPosts(new Map(parsedVotes));
      } catch (error) {
        console.error("Error loading saved votes:", error);
      }
    }
  }, []);

  // Save voted posts to localStorage whenever it changes
  useEffect(() => {
    if (votedPosts.size > 0) {
      localStorage.setItem("userVotes", JSON.stringify([...votedPosts]));
    }
  }, [votedPosts]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getPosts();
      setPostData(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (id, vote) => {
    const currentVote = votedPosts.get(id);

    // If user is trying to vote the same way again, show message
    if (currentVote === vote) {
      toast.info(
        `You have already ${vote === "up" ? "upvoted" : "downvoted"} this post.`
      );
      return;
    }

    // Prevent multiple simultaneous votes on the same post
    if (votingInProgress.has(id)) {
      return;
    }

    // Add to voting in progress
    setVotingInProgress((prev) => new Set(prev).add(id));

    // Calculate vote change
    let voteChange = 0;
    if (currentVote === null || currentVote === undefined) {
      // First vote
      voteChange = vote === "up" ? 1 : -1;
    } else {
      // Changing vote (from up to down or vice versa)
      voteChange = vote === "up" ? 2 : -2;
    }

    // Optimistically update UI
    setPostData((prev) =>
      prev.map((post) =>
        post._id === id
          ? {
              ...post,
              votes: (post.votes || 0) + voteChange,
            }
          : post
      )
    );

    // Update voted posts state optimistically
    setVotedPosts((prev) => new Map(prev).set(id, vote));

    try {
      await updateVote(id, vote);
      toast.success(`${vote === "up" ? "Upvoted" : "Downvoted"} successfully!`);
    } catch (error) {
      // Revert optimistic updates on error
      setPostData((prev) =>
        prev.map((post) =>
          post._id === id
            ? {
                ...post,
                votes: (post.votes || 0) - voteChange,
              }
            : post
        )
      );

      // Revert vote state
      setVotedPosts((prev) => {
        const newMap = new Map(prev);
        if (currentVote === null || currentVote === undefined) {
          newMap.delete(id);
        } else {
          newMap.set(id, currentVote);
        }
        return newMap;
      });

      if (error.response && error.response.status === 403) {
        toast.error("You have already voted on this post.");
      } else if (error.response && error.response.status === 429) {
        toast.error("Too many requests. Please wait before voting again.");
      } else {
        toast.error("Error voting. Please try again.");
        console.error("Error voting:", error);
      }
    } finally {
      // Remove from voting in progress
      setVotingInProgress((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleRemoveVote = async (id) => {
    const currentVote = votedPosts.get(id);
    if (!currentVote) return;

    // Prevent multiple simultaneous operations
    if (votingInProgress.has(id)) return;

    setVotingInProgress((prev) => new Set(prev).add(id));

    // Calculate vote change to revert
    const voteChange = currentVote === "up" ? -1 : 1;

    // Optimistically update UI
    setPostData((prev) =>
      prev.map((post) =>
        post._id === id
          ? {
              ...post,
              votes: (post.votes || 0) + voteChange,
            }
          : post
      )
    );

    // Remove vote from state
    setVotedPosts((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });

    try {
      // You'll need to implement a removeVote API endpoint
      // await removeVote(id);
      toast.success("Vote removed successfully!");
    } catch (error) {
      console.log(error);
      // Revert on error
      setPostData((prev) =>
        prev.map((post) =>
          post._id === id
            ? {
                ...post,
                votes: (post.votes || 0) - voteChange,
              }
            : post
        )
      );

      setVotedPosts((prev) => new Map(prev).set(id, currentVote));
      toast.error("Error removing vote. Please try again.");
    } finally {
      setVotingInProgress((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
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

                const userVote = votedPosts.get(post._id);
                const isVoting = votingInProgress.has(post._id);

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
                        className={`
                          p-2 rounded-full transition-all duration-200 
                          ${
                            userVote === "up"
                              ? "bg-blue-500 text-white shadow-md"
                              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                          }
                          ${
                            isVoting
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:scale-105"
                          }
                          disabled:cursor-not-allowed
                        `}
                        onClick={() =>
                          userVote === "up"
                            ? handleRemoveVote(post._id)
                            : handleVote(post._id, "up")
                        }
                        aria-label={
                          userVote === "up" ? "Remove upvote" : "Upvote"
                        }
                        disabled={isVoting}
                      >
                        <ChevronUp
                          className={`w-6 h-6 ${
                            isVoting ? "animate-pulse" : ""
                          }`}
                        />
                      </button>

                      <span
                        className={`
                        text-lg font-bold px-2 transition-colors duration-200
                        ${
                          userVote === "up"
                            ? "text-blue-600"
                            : userVote === "down"
                            ? "text-red-600"
                            : "text-gray-800"
                        }
                      `}
                      >
                        {typeof post.votes === "number" ? post.votes : 0}
                      </span>

                      <button
                        className={`
                          p-2 rounded-full transition-all duration-200
                          ${
                            userVote === "down"
                              ? "bg-red-500 text-white shadow-md"
                              : "bg-red-100 text-red-600 hover:bg-red-200"
                          }
                          ${
                            isVoting
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:scale-105"
                          }
                          disabled:cursor-not-allowed
                        `}
                        onClick={() =>
                          userVote === "down"
                            ? handleRemoveVote(post._id)
                            : handleVote(post._id, "down")
                        }
                        aria-label={
                          userVote === "down" ? "Remove downvote" : "Downvote"
                        }
                        disabled={isVoting}
                      >
                        <ChevronDown
                          className={`w-6 h-6 ${
                            isVoting ? "animate-pulse" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Vote status indicator */}
                    {userVote && (
                      <div className="absolute top-2 right-2 sm:top-2 sm:right-16">
                        <span
                          className={`
                          text-xs px-2 py-1 rounded-full font-medium
                          ${
                            userVote === "up"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                        >
                          {userVote === "up" ? "👍 Upvoted" : "👎 Downvoted"}
                        </span>
                      </div>
                    )}
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
