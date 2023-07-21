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
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");

  console.log("hello", uuid);

  useEffect(() => {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    setCurrentDateTime(dateTimeString);

    console.log({ currentDateTime });
    if (
      title === "" &&
      subTitle === "" &&
      selectedOption === "" &&
      body === "" &&
      selectedImage === ""
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
    timestamp: currentDateTime,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      title !== "" &&
      subTitle !== "" &&
      body !== "" &&
      selectedOption !== "" &&
      imageUrl !== ""
    ) {
      const updates = {};
      updates["/news/" + uuid] = postData;

      update(ref(database), updates);

      setTitle("");
      setSubTitle("");
      setSelectedOption("");
      setSelectedImage("");
      setBody("");

      setSuccessAlert(true);

      setTimeout(() => {
        setSuccessAlert(false);
        console.log("time out");
      }, 5000);
    } else {
      console.log("image url is empty");
      setErrorAlert(true);

      setTimeout(() => {
        setErrorAlert(false);
        console.log("time out");
      }, 5000);
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
                  <div>
                    {" "}
                    <img
                      src={selectedImage}
                      alt="Uploaded"
                      className="max-w-full h-auto"
                    />
                    <div className="w-full flex justify-center mt-4">
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
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
            {successAlert && (
              <div className="bg-blue-400  mt-2 py-2 px-4 w-full rounded-md shadow-md text-center font-medium">
                Publish Successfully
              </div>
            )}
            {errorAlert && (
              <div className="bg-red-400  mt-2 py-2 px-4 w-full rounded-md shadow-md text-center font-medium">
                Fill in the Blank Spaces
              </div>
            )}
            <button
              className="primary w-full"
              type="submit"
              disabled={buttonReady ? true : false}>
              {buttonReady ? (
                <div>Publish</div>
              ) : imageReady ? (
                "Image Uplaoding ..."
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
