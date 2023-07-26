import { useState } from "react";
import React from "react";
import { set, ref, child, push, update } from "firebase/database";
import { database } from "../firebase";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

function CreateTips() {
  const uuid = uuidv4();

  const [title, setTitle] = useState("");

  const [body, setBody] = useState("");

  console.log("hello", uuid);

  // A post entry.
  const postData = {
    uuid,
    title,
    body,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "" && body !== "") {
      // Get a key for a new Post.
      const newPostKey = push(child(ref(database), "Tips")).key;

      const updates = {};
      updates["/tips/" + uuid] = postData;

      update(ref(database), updates);
      console.log("save tip");

      setTitle("");
      setBody("");
    }
  };

  return (
    <div className="flex justify-between">
      <div className="w-full">
        <img
          src="https://i.pinimg.com/564x/c7/f3/6e/c7f36e60f34cc5a66901c15db60fc034.jpg"
          className="rounded-md"
        />
      </div>
      <div className="w-full mx-auto h-[90vh] overflow-y-auto">
        <div className="w-full text-2xl font-bold mb-2 text-center font-serif text-primary z-20 pt-4 ">
          Tips
        </div>
        <form
          className="bg-white shadow-md rounded px-8 pt-2 pb-2 mb-4"
          onSubmit={handleSubmit}>
          <div className="mb-4 flex">
            <label
              className=" text-gray-700 text-lg flex items-center font-bold mb-2 mr-8"
              htmlFor="title">
              Title
            </label>
            <input
              className="h-12  border-primary  border-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="my-12 flex">
            <label
              className="flex mt-4  text-gray-700 text-lg font-bold mb-2 mr-8"
              htmlFor="excerpt">
              Body
            </label>
            <textarea
              className="shadow appearance-none border-primary border-2 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="excerpt"
              placeholder="Enter the excerpt"
              rows="10"
              value={body}
              onChange={(e) => setBody(e.target.value)}></textarea>
          </div>

          <div className="w-full">
            <button className="primary w-full" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTips;
