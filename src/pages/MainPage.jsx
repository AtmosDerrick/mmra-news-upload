import React, { useState, useEffect } from "react";
import News from "../components/News";
import { Link } from "react-router-dom";
import { database } from "../firebase";
import { getDatabase, ref, onValue, update } from "firebase/database";

function MainPage() {
  const [search, setSearch] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [prevNews, setPrevNews] = useState([]);
  const [pageReady, setPageReady] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [getDeletedItem, setGetDeletedItem] = useState("");

  useEffect(() => {
    onValue(ref(database), (snapshot) => {
      const data = snapshot.val();

      if (data !== null) {
        const getNewsData = Object.values(data.news);
        const getPrevNewsData = Object.values(data.news);

        setNewsData(getNewsData);
        setPrevNews(getPrevNewsData);

        console.log({ newsData });

        setPageReady(true);
      }
    });
  }, []);

  console.log({ getDeletedItem });

  const handleDelete = () => {
    const updates = {};
    updates[`/news/${getDeletedItem}`] = null; // Remove the child node under the parent node
    //Update the Firebase database with the 'updates' object
    update(ref(database), updates)
      .then(() => {
        console.log("Data deleted successfully");
        setDeleteAlert(false);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      })
      .finally(() => {});
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setNewsData(prevNews);

    console.log("checking", newsData);

    if (search !== "") {
      const searchNews = prevNews.filter((news) => {
        return news.title.toLowerCase().includes(search.toLocaleLowerCase());
      });

      setNewsData(searchNews);
    }
  };

  console.log(newsData.length, "new data is what");

  return (
    <div>
      {deleteAlert === true ? (
        <div className="w-1/2 mx-auto  ">
          <div className="w-1/2   h-[60vh] absolute z-30 flex items-center">
            <div className="w-3/4 px-4 mx-auto h-[] mt-8 p-4 bg-white shadow-md rounded-md">
              <h4 className="text-lg  mb-4">
                News will be deleted permenently, will like to continue?
              </h4>
              <div className="flex justify-between w-3/4mx-auto ">
                <div>
                  {" "}
                  <button
                    className="px-6 py-2 border-2 border-black rounded-md"
                    onClick={() => {
                      setDeleteAlert(false);
                    }}>
                    Cancel
                  </button>
                </div>
                <div>
                  {" "}
                  <button
                    className="px-6 py-2 bg-red-600 rounded-md"
                    onClick={handleDelete}>
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="bg-gray-100 h-[10vh] w-full mt-4 md:rounded-2xl flex justify-between py-2 px-2">
        <div className="w-2/4 gap-2 flex justify-start ">
          <div className="flex items-center bg-primary text-secondary  rounded-md px-2 md:px-4 py-1 md:py-2">
            <Link to={"/createNews"} className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="hidden md:block">Create News</span>
            </Link>
          </div>
          <div className="flex items-center bg-primary text-secondary  px-2 md:px-4 py-1 md:py-2 rounded-md">
            <Link to="/createtips" className="flex  gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
              <span className="hidden md:block">Create Tips</span>
            </Link>
          </div>
        </div>

        <div className="w-2/4">
          <form className="flex gap-2">
            <input
              type="text"
              placeholder="search..."
              onChange={(e) => {
                setSearch(e.target.value);
                if (search === "") {
                  setNewsData(prevNews);
                }
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button className="primary flex gap-2  " onClick={handleSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <span className="hidden md:block">Search</span>
            </button>
          </form>
        </div>
      </div>
      {newsData ? (
        <News
          newsData={newsData}
          setNewsData={setNewsData}
          pageReady={pageReady}
          setDelete={setDeleteAlert}
          getDeletedItem={getDeletedItem}
          setGetDeletedItem={setGetDeletedItem}
        />
      ) : (
        console.log("undefine")
      )}
    </div>
  );
}

export default MainPage;
