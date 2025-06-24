import React, {useEffect, useState} from "react";
import UserInputSection from "./components/userInputSection";
import {getPosts} from "@/services/api";
import {Heart} from "lucide-react";

const Dashboard = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPostData(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <UserInputSection />
      <div>
        <ul className="max-w-3xl flex justify-center flex-col mx-auto gap-5 p-5">
          {postData.map((post) => {
            const {
              id,
              title,
              descrption,
              username,
              twitterUsername,
              resourceUrl,
              category,
            } = post;
            return (
              <li
                key={id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 flex flex-col gap-2 hover:shadow-md transition-shadow"
              >
                {/* <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                    #1
                  </span>
                </div> */}
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-xs bg-black text-white px-3 py-2 rounded-full font-semibold">
                    #1
                  </span>{" "}
                  {title}
                </h2>
                <p className="text-gray-700">{descrption}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-sm text-gray-500">
                    <span className="font-semibold">By :</span>{" "}
                    {twitterUsername && (
                      <a
                        href={`https://twitter.com/${twitterUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {username}
                      </a>
                    )}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                    {category}
                  </span>
                  <span>
                    {resourceUrl && (
                      <a
                        href={resourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-sm text-blue-600 hover:underline"
                      >
                        Resource
                      </a>
                    )}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
