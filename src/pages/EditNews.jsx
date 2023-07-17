import { useState } from "react";
import React from "react";

function EditNews({ edittitle, editsubTitle, editbody }) {
  const [title, setTitle] = useState(edittitle);
  const [subTitle, setSubTitle] = useState(editsubTitle);

  const [excerpt, setExcerpt] = useState(editbody);

  const [selectedImage, setSelectedImage] = useState(null);

  console.log(title);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };
  return (
    <div className="flex justify-between">
      <div className="w-full">
        <img
          src="https://i.pinimg.com/564x/69/20/48/692048f3e7db73e974ae84d0520f9b28.jpg"
          alt="cyber globe"
          className="h-[90vh]"
        />
      </div>
      <div className="w-full h-[90vh] overflow-y-auto">
        <div className="w-full text-2xl font-bold mb-2 text-center font-serif text-primary z-20 pt-4 ">
          Edit Your News
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
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}></textarea>
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
            <button className="primary w-full" type="submit">
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNews;
