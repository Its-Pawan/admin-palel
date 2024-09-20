import { MdFileUpload } from "react-icons/md";
import Card from "components/card";
import React, { useState } from "react";

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here, such as uploading the file
    console.log("File submitted:", file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
        {/* Drag-and-drop file upload */}
        <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
          <div
            className={`flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed py-3 lg:pb-0 ${
              dragActive
                ? "border-brand-500 dark:border-white"
                : "border-gray-200 dark:border-navy-700"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="hidden"
              id="fileUpload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileUpload"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
            >
              <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
              <h4 className="text-xl font-bold text-brand-500 dark:text-white">
                {file ? file.name : "Upload Files"}
              </h4>
              <p className="mt-2 text-sm font-medium text-gray-600">
                PNG, JPG, and GIF files are allowed
              </p>
            </label>
            {dragActive && (
              <p className="text-brand-500">Drop your file here</p>
            )}
          </div>
        </div>

        {/* Profile completion section */}
        <div className="col-span-5 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
          <h5 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-white">
            Upload Images <br /> Here
          </h5>
          <p className="leading-1 mt-2 text-base font-normal text-gray-600">
            Upload your image and generate a link to share or embed it anywhere
            for use.
          </p>
          <button
            type="submit"
            className="linear mt-5 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Upload Image
          </button>
        </div>
      </Card>
    </form>
  );
};

export default Upload;
