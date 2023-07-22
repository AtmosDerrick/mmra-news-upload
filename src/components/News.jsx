import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { database } from "../firebase";
//images
import newsImage from "../images/news.jpg";
import EditNews from "../pages/EditNews";
import {
  getDatabase,
  update,
  ref,
  onValue,
  remove,
  child,
  push,
} from "firebase/database";
import { UserAuth } from "../context/Auth";

function News({ newsData, setNewsData, pageReady }) {
  const [redirect, setRedirect] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [body, setBody] = useState("");
  const [isDeleting, setIsDeleting] = useState("");
  const [uuid, setuuid] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [usere, setUser] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const { user } = UserAuth();

  console.log("check to see page open");

  const filterData = newsData.filter((filterNews) => {
    return filterNews.email === user.user;
  });

  const reverseNews = filterData.reverse();

  const editNew = (uuid, title, subtitle, body, imageUrl, user1, timestamp) => {
    console.log({ user1 });
    setTitle(title);
    setSubTitle(subtitle);
    setBody(body);
    setuuid(uuid);
    setImageUrl(imageUrl);
    setUser(user1);
    setTimestamp(timestamp);

    setRedirect("true");
  };

  if (redirect) {
    return (
      <EditNews
        edittitle={title}
        editsubTitle={subTitle}
        editbody={body}
        edituuid={uuid}
        editImageUrl={imageUrl}
        edituser={usere}
        edittimestamp={timestamp}
      />
    );
  }

  const handleDelete = (newone) => {
    const updates = {};
    updates[`/news/${newone.uuid}`] = null; // Remove the child node under the parent node

    // Update the Firebase database with the 'updates' object
    update(ref(database), updates)
      .then(() => {
        console.log("Data deleted successfully");
        setIsDeleting(true);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  if (pageReady === false) {
    return (
      <div>
        <img src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif" />
      </div>
    );
  }

  if (reverseNews === []) {
    <div className="flex justify-center items-center w-full text-xl">
      No News Add
    </div>;
  } else
    return (
      <div>
        {
          <div className="mt-4 grid grid-cols-4 gap-4">
            {reverseNews.map((newone) => (
              <div
                key={newone.uuid}
                className="h-[auto] rounded-md shadow-md bg-white ">
                <div>
                  <img
                    src={newone.imageUrl}
                    alt="newsImage"
                    className="h-[15rem] w-full"
                  />
                </div>
                <div className="p-2">
                  <div className="w-full py-1">
                    {" "}
                    <h2 className="text-xl truncate font-bold font-sans text-primary  ">
                      {newone.title}
                    </h2>
                  </div>
                  <p className="text-base italic truncate ">{newone.body}</p>
                </div>
                <div className="relative mt-8">
                  <div className="absolute bottom-1 right-1 z-60">
                    <div className="flex gap-2">
                      <div
                        onClick={() => {
                          editNew(
                            newone.uuid,
                            newone.title,
                            newone.subTitle,
                            newone.body,
                            newone.imageUrl,
                            newone.user,
                            newone.timestamp
                          );

                          console.log(newone.uuid, "ftr");
                        }}>
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-primary">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </div>{" "}
                      <button onClick={() => handleDelete(newone)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-primary">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    );
}

export default News;
