import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

//images
import newsImage from "../images/news.jpg";
import EditNews from "../pages/EditNews";
import { getDatabase, ref, onValue } from "firebase/database";
import { database } from "../firebase";

function News() {
  const [redirect, setRedirect] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [body, setBody] = useState("");
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    onValue(ref(database), (snapshot) => {
      setNewsData([]);
      const data = snapshot.val();
      console.log("firebase", data);
      const getNewsData = data.news;
      if (data !== null) {
        Object.values(getNewsData).map((news) => {
          console.log(news);
          setNewsData((oldArray) => [...oldArray, news]);
        });
      }
    });
  }, []);

  const news = [
    {
      id: "1",
      title: "Title1",
      subTitle: "Subtitle1",
      body: "Commodo sint cupidatat deserunt ex minim voluptate Lorem. Aute velit quis ut quis sint elit reprehenderit officia aliquip laborum...",
      image: newsImage,
    },
    {
      id: "2",
      title: "Title2",
      subTitle: "Subtitle2",
      body: "Commodo sint cupidatat deserunt ex minim voluptate Lorem. Aute velit quis ut quis sint elit reprehenderit officia aliquip laborum...",
      image:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/01/30/15/online-dating-scam.jpg?width=1200&height=900&fit=crop",
    },
    {
      id: "3",
      title: "Title3",
      subTitle: "Subtitle3",
      body: "Commodo sint cupidatat deserunt ex minim voluptate Lorem. Aute velit quis ut quis sint elit reprehenderit officia aliquip laborum...",
      image:
        "https://media.kasperskycontenthub.com/wp-content/uploads/sites/103/2020/11/19110609/iot-540x270.jpg",
    },
    {
      id: "4",
      title: "Title4",
      subTitle: "Subtitle4",
      body: "Commodo sint cupidatat deserunt ex minim voluptate Lorem. Aute velit quis ut quis sint elit reprehenderit officia aliquip laborum...",
      image:
        "https://cdn.ghanaweb.com/imagelib/src/Ursula_Owusu_Ekuful-Parliament202121.jpg",
    },
  ];

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
  return (
    <div className="mt-4 grid grid-cols-4 gap-2">
      {news.map((newone) => (
        <div className="h-[30rem] rounded-md shadow-md bg-white ">
          <div>
            <img src={newone.image} alt="newImage" className="h-[15rem]" />
          </div>
          <div className="p-2">
            <div className="w-full py-1">
              {" "}
              <h2 className="text-2xl font-bold font-sans text-primary  ">
                {newone.title}
              </h2>
              <h4 className="text-lg font-medium text-gray-700 ">
                {newone.subTitle}
              </h4>
            </div>
            <p className="text-base italic">
              Do aliqua proident et sunt minim in nulla anim aliqua.
              Exercitation commodo commodo consectetur ipsum id...
            </p>
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
