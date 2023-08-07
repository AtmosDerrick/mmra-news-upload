import { useState } from "react";
import React from "react";
import { getDatabase, ref, child, push, update } from "firebase/database";
import { database } from "../firebase";

function EditNews({
  edittitle,
  editsubTitle,
  editbody,
  edituuid,
  editImageUrl,
  edituser,
  edittimestamp,
}) {
  const [title, setTitle] = useState(edittitle);
  const [subTitle, setSubTitle] = useState(editsubTitle);
  const [body, setBody] = useState(editbody);
  const [imageUrl, setImageUrl] = useState(editImageUrl);
  const [user, setUser] = useState(edituser);
  const [isEditing, setisEditing] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  console.log({ edituuid }, "working");

  const [selectedImage, setSelectedImage] = useState(null);

  console.log({ edituuid });

  const handleUpate = (e) => {
    e.preventDefault();
    setisEditing(false);
    // Logic to handle form submission

    const updates = {};
    updates[`/news/${edituuid}`] = {
      title,
      subTitle,
      body,
      imageUrl,
      user,
      uuid: edituuid,
      timestamp: edittimestamp,
    }; // edit the child node under the parent node

    // Update the Firebase database with the 'updates' object
    update(ref(database), updates)
      .then(() => {
        console.log("Data edit successfully");
        setisEditing(true);
        setTitle("");
        setSubTitle("");

        setBody("");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setErrorAlert(true);
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };
  return (
    <div>
      <div className="md:flex md:justify-between">
        <div className="w-full">
          <img
            src="https://i.pinimg.com/564x/69/20/48/692048f3e7db73e974ae84d0520f9b28.jpg"
            alt="cyber globe"
            className="md:h-[90vh]"
          />
        </div>
        <div className="w-full h-[90vh] overflow-y-auto">
          <div>
            {" "}
            {isEditing && (
              <div className="bg-blue-400  mt-2 py-2 px-4 w-full rounded-md shadow-md text-center font-medium">
                Edit successfully
              </div>
            )}
            {errorAlert && (
              <div className="bg-red-400  mt-2 py-2 px-4 w-full rounded-md shadow-md text-center font-medium">
                Something went wrong
              </div>
            )}
          </div>
          <div className="w-full text-2xl font-bold mb-2 text-center font-serif text-primary z-20 pt-4 ">
            Edit Your News
          </div>
          <form
            className="bg-white shadow-md rounded px-8 pt-2 pb-2 mb-4"
            onSubmit={handleUpate}>
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
              <div className=""></div>
            </div>
            <div className="w-full">
              <button className="primary w-full" type="submit">
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditNews;
