import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { database } from "../firebase";
//images
import newsImage from "../images/news.jpg";
import EditNews from "../pages/EditNews";
import { getDatabase, ref, onValue } from "firebase/database";
import { UserAuth } from "../context/Auth";

function News() {
  const [redirect, setRedirect] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [body, setBody] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [pageReady, setPageReady] = useState(false);
  const { user } = UserAuth();

  useEffect(() => {
    onValue(ref(database), (snapshot) => {
      setNewsData([]);
      const data = snapshot.val();

      const getNewsData = data.news;
      console.log("data news", getNewsData);
      if (data !== null) {
        Object.values(getNewsData).map((news) => {
          console.log(news);
          setNewsData((oldArray) => [...oldArray, news]);
          setPageReady(true);
        });
      }
    });
  }, []);

  if (pageReady) {
    console.log("page ready", pageReady);
  }

  const filterData = newsData.filter((filterNews) => {
    return filterNews.email === user.user;
  });

  const editNew = (id, title, subtitle, body) => {
    setRedirect("true");
    setTitle(title);
    setSubTitle(subtitle);
    setBody(body);
  };

  if (redirect) {
    return (
      <EditNews edittitle={title} editsubTitle={subTitle} editbody={body} />
    );
  }

  if (pageReady === false) {
    return (
      <div>
        <img src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif" />
      </div>
    );
  }
  return (
    <div className="mt-4 grid grid-cols-4 gap-4">
      {filterData.map((newone) => (
        <div
          key={newone.uuid}
          className="h-[auto] rounded-md shadow-md bg-white ">
          <div>
            <img
              src={newone.imageUrl}
              alt="newImage"
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
                      newone.id,
                      newone.title,
                      newone.subTitle,
                      newone.body
                    );
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
                <div>
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default News;
