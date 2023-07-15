import { useEffect, useState } from "react";
import React from "react";
import { set, ref, child, push, update } from "firebase/database";
import { database, storage } from "../firebase";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../context/Auth";
import { ref as storageRef } from "firebase/storage";

function CreateNews() {
  const uuid = uuidv4();
  const { user } = UserAuth();

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const [body, setBody] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [buttonReady, setButtonReady] = useState(false);
  const [imageReady, setImageReady] = useState(false);

  console.log("hello", uuid);

  useEffect(() => {
    if (
      title === "" &&
      subTitle === "" &&
      selectedOption === "" &&
      body === ""
    ) {
      setButtonReady(true);
    } else {
      setButtonReady(false);
    }
  }, [title, subTitle, body, selectedOption]);

  // A post entry.
  const postData = {
    uuid,
    user: user.email,

    title,
    subTitle,
    body,
    imageUrl,
    NewsCats: selectedOption,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageUrl !== "") {
      // Get a key for a new Post.
      const newPostKey = push(child(ref(database), "news")).key;

      const updates = {};
      updates["/news/" + newPostKey] = postData;
      updates["/user-news/" + uuid + "/" + newPostKey] = postData;

      return update(ref(database), updates);
    } else {
      console.log("image url is empty");
    }
  };

  const handleImageUpload = (e) => {
    setImageReady(true);
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    console.log("image", file);
    const imageRef = storageRef(storage, file.name);

    // 'file' comes from the Blob or File API
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then(() => {
        getDownloadURL(imageRef).then((imageUrl) => {
          console.log("image url", imageUrl);
          setImageUrl(imageUrl);
          setImageReady(false);
        });
      });
  };
  return (
    <div className="flex justify-between">
      <div className="w-full">
        <img
          src="https://i.pinimg.com/564x/e4/3f/11/e43f11f2b4e2140df7e92321f18dcea4.jpg"
          alt="cyber globe"
          className="h-[90vh]"
        />
      </div>
      <div className="w-full h-[90vh] overflow-y-auto">
        <div className="w-full text-2xl font-bold mb-2 text-center font-serif text-primary z-20 pt-4 ">
          Create News
        </div>
        <form
          className="bg-white shadow-md rounded px-8 pt-2 pb-2 mb-4"
          onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title">
              Sub Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter the subtitle"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="selectInput" className="mr-4">
              Select Category
            </label>
            <select
              id="selectInput"
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
              }}>
              <option value="">News type</option>
              <option value="csa">Cyber Security Act</option>
              <option value="dta">Data Protection Act</option>
              <option value="eta">Electronic Transaction Act</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="excerpt">
              Body
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="excerpt"
              placeholder="Enter the excerpt"
              rows="10"
              value={body}
              onChange={(e) => setBody(e.target.value)}></textarea>
          </div>
          <div className="mb-4">
            <div className="">
              <div className="flex items-center justify-center">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="max-w-full h-auto"
                  />
                ) : (
                  <div className="border-2 border-gray-300 border-dashed rounded-lg p-6">
                    <label
                      htmlFor="imageUpload"
                      className="flex items-center justify-center flex-col cursor-pointer">
                      <svg
                        className="w-12 h-12 text-gray-500 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span className="text-gray-500">Upload an image</span>
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full">
            <button
              className="primary w-full"
              type="submit"
              disabled={buttonReady ? true : imageReady ? true : false}>
              {buttonReady ? (
                <div>Publish</div>
              ) : imageReady ? (
                "Image Loading ..."
              ) : (
                "Publish"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNews;
