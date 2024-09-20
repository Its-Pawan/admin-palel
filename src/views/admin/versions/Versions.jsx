import Card from "components/card";
import UniversalButton from "components/universalButton/UniversalButton";
import { useEffect, useState } from "react";
import Version from "./Version";
import Modal from "components/modal";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import JoditEditorField from "components/fields/JoditEditorField";
import {
  notifyError,
  notifySuccess,
} from "components/utils/ToastNotifications";
import DeleteModel from "components/modal/DeleteModel";

import {
  getAllVersion,
  deleteById,
  addNewVersion,
  getVarsionBySlug,
  updateBySlug,
} from "features/version/versionSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/loader/Loader";

const Versions = () => {
  const {
    versions,
    isLoadingForUpload,
    isLoading,
    success,
    error,
    singleVersion,
  } = useSelector((state) => state.version);

  const dispatch = useDispatch();

  const [reloadVersions, setReloadVersions] = useState(false);
  useEffect(() => {
    if (reloadVersions || versions.length === 0) {
      dispatch(getAllVersion()).then(() => {
        setReloadVersions(false); // Reset after fetching
      });
    }
  }, [dispatch, reloadVersions, reloadVersions.length]);

  const [newBtnText, setNewBtnText] = useState("Release Update");
  const [onUpdate, setOnUpdate] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [deleteModel, setDeleteModel] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const cancelNotify = () => notifyError();

  const [formData, setFormData] = useState({
    versionNumber: "",
    heading: "",
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const [versionSlug, setVersionSlug] = useState("");
  const handleUpdateButtonClick = async (slug) => {
    setOnUpdate(true);
    setModalTitle("Update Project");
    setVersionSlug(slug);
    const resultAction = await dispatch(getVarsionBySlug(slug));
    // console.log(resultAction.payload.data._id);
    if (getVarsionBySlug.fulfilled.match(resultAction)) {
      // Log the content of the blog after the state is updated
      const selectedVersion = resultAction.payload.data;
      setFormData({
        versionNumber: selectedVersion.versionNumber || "",
        heading: selectedVersion.heading || "",
        content: selectedVersion.content || "",
      });
    }
    openModal();
  };

  const [versionId, setVersionId] = useState("");
  const handleDeleteButtonClick = async () => {
    setConfirmDeletion(true);
    if (confirmDeletion) {
      const resultAction = await dispatch(deleteById(versionId));
      if (deleteById.fulfilled.match(resultAction) || success) {
        setReloadVersions(true);
        setDeleteModel(false);
      }
      if (error) {
        setDeleteModel(false);
      }
    }
  };

  const handleClearFields = () => {
    setModalTitle("Release New Version");
    setFormData({
      versionNumber: "",
      heading: "",
      content: "",
    });
  };

  const handleVersionSubmit = async (e) => {
    e.preventDefault();
    if (
      Object.values(formData).some(
        (input) => typeof input === "string" && input.trim() === ""
      )
    ) {
      notifyError("All fields are required");
      return;
    }
    if (onUpdate) {
      // console.log(versionId);
      const resultAction = await dispatch(
        updateBySlug({ slug: versionId, versionData: formData })
      );

      if (updateBySlug.fulfilled.match(resultAction) || success) {
        closeModal();
        setReloadVersions(true);
        setFormData({
          versionNumber: "",
          heading: "",
          content: "",
        });
        setNewBtnText("Release Update");
      }
      if (error) {
        closeModal();
        setNewBtnText("Failed...");
        notifyError("Failed to store blog");
      }
    } else {
      const resultAction = await dispatch(addNewVersion(formData));

      if (addNewVersion.fulfilled.match(resultAction) || success) {
        closeModal();
        // notifySuccess("New Blog Added");
        setReloadVersions(true); // Trigger reload
        setFormData({
          versionNumber: "",
          heading: "",
          content: "",
        });
        setNewBtnText("Submit");
      }
      if (error) {
        closeModal();
        setNewBtnText("Failed...");
        notifyError("Failed to store blog");
      }
    }
    closeModal();
  };

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          All Application Versions
        </div>
        <div
          onClick={openModal}
          className="text-xl font-bold text-navy-700 dark:text-white"
        >
          <UniversalButton
            onClick={handleClearFields}
            text="Add New Version"
            baseColor="brand"
          />
        </div>
      </header>
      <hr className="my-3 mb-5" />
      <div className=" ">
        {isLoading && isLoadingForUpload ? (
          <Loader extra="min-h-[7rem] bg-white" />
        ) : versions && versions.length > 0 ? (
          versions.map((version, index) =>
            version ? (
              <Version
                key={index}
                version={version}
                setVersionId={setVersionId}
                handleUpdateButtonClick={handleUpdateButtonClick}
                setDeleteModel={setDeleteModel}
              />
            ) : (
              <Loader />
            )
          )
        ) : (
          <p className="py-8 text-lg font-semibold text-gray-600">
            No Data Found!
          </p>
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
        <form onSubmit={handleVersionSubmit} method="post">
          <InputField
            label="Varsion Name"
            name="versionNumber"
            type="text"
            value={formData.versionNumber}
            placeholder="Ex: 2.0.2"
            handleChange={handleInputChange}
          />

          <TextField
            label="Short Name"
            placeholder="Enter Short Description"
            name="heading"
            rows="3"
            value={formData.heading}
            handleChange={handleInputChange}
          />
          <JoditEditorField
            name="content"
            label="Version Content"
            value={formData.content}
            handleChange={handleInputChange}
          />

          <div className="flex justify-end gap-4">
            <UniversalButton
              type="submit"
              baseColor="brand"
              extraClasses="mt-2"
              text={isLoadingForUpload ? "Processing..." : newBtnText}
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
        deleteModelTitle="Do really want to delete this item"
      />
    </Card>
  );
};

export default Versions;
