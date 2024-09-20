import { useState, useEffect } from "react";

import Card from "components/card";
import UniversalButton from "components/universalButton/UniversalButton";
import Modal from "components/modal";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import JoditEditorField from "components/fields/JoditEditorField";
import BlogPost from "./BlogPost";
import {
  notifyError,
  notifySuccess,
} from "components/utils/ToastNotifications";
import DeleteModel from "components/modal/DeleteModel";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllBlogs,
  addNewBlog,
  updateBySlug,
  getBlogBySlug,
  deleteById,
} from "features/blogs/blogSlice";
import Loader from "components/loader/Loader";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, isLoadingForUpload, isLoading, success, error } =
    useSelector((state) => state.blog);

  const [reloadBlogs, setReloadBlogs] = useState(false);
  useEffect(() => {
    if (reloadBlogs || blogs.length === 0) {
      dispatch(getAllBlogs()).then(() => {
        setReloadBlogs(false); // Reset after fetching
      });
    }
  }, [dispatch, reloadBlogs, blogs.length]);

  const [newBtnText, setNewBtnText] = useState("Create Post");

  const [onUpdate, setOnUpdate] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [modalTitle, setModalTitle] = useState("Create New Blog Post");

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const cancelNotify = () => notifyError();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    description: "",
    thumbnail: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail" && files.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        thumbnail: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const [blogSlug, setBlogSlug] = useState("");

  const handleUpdateButtonClick = async (slug) => {
    setBlogSlug(slug);
    setOnUpdate(true);
    setNewBtnText("Update");
    setModalTitle("Update Blog Post");
    const resultAction = await dispatch(getBlogBySlug(slug));

    if (getBlogBySlug.fulfilled.match(resultAction)) {
      // Log the content of the blog after the state is updated
      const selectedBlog = resultAction.payload.data.selectedBlog;
      setFormData({
        title: selectedBlog.title || "",
        content: selectedBlog.content || "",
        description: selectedBlog.description || "",
        thumbnail: selectedBlog.thumbnail || "",
      });
      openModal();
    }
  };

  const [blogId, setBlogId] = useState("");

  const handleDeleteButtonClick = async () => {
    setConfirmDeletion(true);
    if (confirmDeletion) {
      const resultAction = await dispatch(deleteById(blogId));
      if (deleteById.fulfilled.match(resultAction) || success) {
        setReloadBlogs(true);
        notifySuccess("Post Deleted successfully");
        setDeleteModel(false);
      }
      if (error) {
        setDeleteModel(false);
        notifyError("Failed to delete blog");
      }
    }
  };

  const handleClearFields = () => {
    setModalTitle("Create New Blog Post");
    setFormData({
      title: "",
      content: "",
      description: "",
      thumbnail: null,
    });
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((input) => input?.trim() === "")) {
      notifyError("All fields a required");
      return;
    }
    if (onUpdate) {
      // console.log("----------Updated Values ------------");
      // console.log(formData);

      const resultAction = await dispatch(
        updateBySlug({ slug: blogSlug, blogData: formData })
      );
      if (isLoadingForUpload || isLoading) {
        setNewBtnText("Updating Post...");
      }

      if (getBlogBySlug.fulfilled.match(resultAction) || success) {
        closeModal();
        notifySuccess("Blog Updated");
        setReloadBlogs(true); // Trigger reload
        setFormData({
          title: "",
          content: "",
          description: "",
          thumbnail: null,
        });
        setNewBtnText("Submit");
      }

      if (error) {
        setNewBtnText("Failed...");
        notifyError("Failed to update blog");
        closeModal();
      }
    } else {
      // console.log("----------New Values ------------");
      // console.log(formData);

      const resultAction = await dispatch(addNewBlog(formData));
      if (isLoadingForUpload || isLoading) {
        setNewBtnText("Adding Post...");
      }

      if (addNewBlog.fulfilled.match(resultAction) || success) {
        closeModal();
        notifySuccess("New Blog Added");
        setReloadBlogs(true); // Trigger reload
        setFormData({
          title: "",
          content: "",
          description: "",
          thumbnail: null,
        });
        setNewBtnText("Submit");
      }
      if (error) {
        closeModal();
        setNewBtnText("Failed...");
        notifyError("Failed to store blog");
      }
    }
  };

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          All Blogs
        </div>
        <div
          onClick={openModal}
          className="text-xl font-bold text-navy-700 dark:text-white"
        >
          <UniversalButton
            onClick={handleClearFields}
            text="Add New Blog"
            baseColor="brand"
          />
        </div>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden ">
        {isLoading ? (
          <Loader extra="min-h-[7rem] bg-white  " />
        ) : (
          <table className="w-full" variant="simple" color="gray-500" mb="24px">
            <thead>
              <tr>
                <th
                  className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                  style={{ width: "5%" }}
                >
                  S.N.
                </th>
                <th
                  className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                  style={{ width: "40%" }}
                >
                  Title
                </th>
                {/* <th className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700" style={{ width: '20%' }}>
      URL
    </th> */}
                <th
                  className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                  style={{ width: "20%" }}
                >
                  Short Description
                </th>
                <th
                  className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                  style={{ width: "35%" }}
                >
                  Content
                </th>
                <th
                  className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                  style={{ width: "10%" }}
                >
                  Date
                </th>
                <th
                  className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                  style={{ width: "10%" }}
                >
                  Image
                </th>
                <th
                  className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                  style={{ width: "10%" }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {blogs && blogs.length > 0 ? (
                blogs.map((blog, index) =>
                  blog && blog._id ? (
                    <BlogPost
                      key={blog._id || index}
                      index={index + 1}
                      blog={blog}
                      handleUpdateButtonClick={handleUpdateButtonClick}
                      setBlogId={setBlogId}
                      setDeleteModel={setDeleteModel}
                    />
                  ) : null
                )
              ) : (
                <tr className="  text-center  ">
                  <td
                    colSpan="7"
                    className="py-8 text-lg font-semibold text-gray-600"
                  >
                    No Blogs Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          cancelNotify();
          closeModal();
        }}
        modelTitle={modalTitle}
      >
        <form
          onSubmit={handleBlogSubmit}
          method="post"
          encType="multipart/form-data"
        >
          <InputField
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            placeholder="Enter Title"
            handleChange={handleInputChange}
          />

          <TextField
            label="Short Description"
            placeholder="Enter Short Description"
            name="description"
            rows="3"
            value={formData.description}
            handleChange={handleInputChange}
          />
          <JoditEditorField
            name="content"
            label="Blog Content"
            value={formData.content}
            handleChange={handleInputChange}
          />

          <InputField
            label="Image"
            type="file"
            name="thumbnail"
            accept="image/*"
            handleChange={handleInputChange}
          />
          <div className="flex justify-end gap-4 ">
            <UniversalButton
              type="submit"
              baseColor="brand"
              extraClasses={`${
                isLoadingForUpload
                  ? "cursor-not-allowed bg-brand-300 hover:bg-brand-300 animate-pulse"
                  : ""
              } mt-2`}
              text={isLoadingForUpload ? "Processing..." : newBtnText}
              disabled={isLoadingForUpload}
            />
            <UniversalButton
              onClick={() => {
                cancelNotify();
                closeModal();
              }}
              type="button"
              baseColor="red"
              extraClasses="mt-2"
              text="Cancel"
            />
          </div>
        </form>
      </Modal>

      <DeleteModel
        deleteModel={deleteModel}
        setDeleteModel={setDeleteModel}
        setConfirmDeletion={setConfirmDeletion}
        handleDeleteButtonClick={handleDeleteButtonClick}
        deleteModelTitle="Do really want to delete this post"
      />
    </Card>
  );
};

export default Blogs;
