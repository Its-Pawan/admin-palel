import { useEffect, useState } from "react";
import Card from "components/card";
import Project from "./Project";
import UniversalButton from "components/universalButton/UniversalButton";
import Modal from "components/modal";
import InputField from "components/fields/InputField";
import JoditEditorField from "components/fields/JoditEditorField";
import DeleteModel from "components/modal/DeleteModel";
import {
  notifyError,
  notifySuccess,
} from "components/utils/ToastNotifications";

import {
  getAllProjects,
  deleteById,
  addNewProject,
  getProjectBySlug,
  updateBySlug,
} from "features/projects/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/loader/Loader";

export default function Projects() {
  const dispatch = useDispatch();
  const {
    projects,
    isLoadingForUpload,
    isLoading,
    success,
    error,
    singleProject,
  } = useSelector((state) => state.project);

  const [reloadProjects, setReloadProjects] = useState(false);
  useEffect(() => {
    if (reloadProjects || projects.length === 0) {
      dispatch(getAllProjects()).then(() => {
        setReloadProjects(false); // Reset after fetching
      });
    }
  }, [dispatch, reloadProjects, projects.length]);

  const [newBtnText, setNewBtnText] = useState("Add Project");
  const [onUpdate, setOnUpdate] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const cancelNotify = () => notifyError();

  const [formData, setFormData] = useState({
    projectName: "",
    projectLink: "",
    shortDescription: "",
    description: "",
    techStack: [],
    projectThumbnail: null,
  });
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "projectThumbnail") {
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

  const [projectSlug, setProjectSlug] = useState("");
  const handleUpdateButtonClick = async (slug) => {
    setOnUpdate(true);
    setNewBtnText("Update");
    setModalTitle("Update Project");
    setProjectSlug(slug);
    const resultAction = await dispatch(getProjectBySlug(slug));
    // console.log(resultAction);
    if (getProjectBySlug.fulfilled.match(resultAction)) {
      // Log the content of the blog after the state is updated
      const selectedProject = resultAction.payload.data.foundProject;
      // console.log(selectedProject);
      setFormData({
        projectName: selectedProject.projectName || "",
        projectLink: selectedProject.projectLink || "",
        shortDescription: selectedProject.shortDescription || "",
        description: selectedProject.description || "",
        techStack: selectedProject.techStack || "",
        projectThumbnail: selectedProject.projectThumbnail || "",
      });
    }
    openModal();
  };

  const handleDeleteButtonClick = async () => {
    setConfirmDeletion(true);
    if (confirmDeletion) {
      const resultAction = await dispatch(deleteById(projectId));
      if (deleteById.fulfilled.match(resultAction) || success) {
        setReloadProjects(true);
        setDeleteModel(false);
      }
      if (error) {
        setDeleteModel(false);
      }
    }
  };

  const handleClearFields = () => {
    setModalTitle("Add Project");
    setFormData({
      projectName: "",
      projectLink: "",
      techStack: [],
      description: "",
      projectThumbnail: null,
      shortDescription: "",
    });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (
      Object.entries(formData).some(
        ([key, value]) =>
          typeof value === "string" && value.trim() === "" && key !== "projectThumbnail"
      )
    ) {
      notifyError("All fields are required");
      return;
    }
    if (onUpdate) {
      // console.log("----------Updated Values ------------");
      const resultAction = await dispatch(
        updateBySlug({ slug: projectSlug, projectData: formData })
      );
      if (isLoadingForUpload || isLoading) {
        setNewBtnText("Updating Post...");
      }
      if (addNewProject.fulfilled.match(resultAction) || success) {
        closeModal();
        setReloadProjects(true);
        setFormData({
          projectName: "",
          projectLink: "",
          techStack: [],
          description: "",
          projectThumbnail: null,
          shortDescription: "",
        });
        setNewBtnText("Submit");
      }
      if (error) {
        closeModal();
        setNewBtnText("Failed...");
        notifyError("Failed to store blog");
      }
    } else {
      // console.log("----------New Values ------------");
      const resultAction = await dispatch(addNewProject(formData));

      if (addNewProject.fulfilled.match(resultAction) || success) {
        closeModal();
        // notifySuccess("New Blog Added");
        setReloadProjects(true); // Trigger reload
        setFormData({
          projectName: "",
          projectLink: "",
          techStack: [],
          description: "",
          projectThumbnail: null,
          shortDescription: "",
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
    <Card extra={"w-full p-4 h-full"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          All Projects
        </div>
        <div
          onClick={openModal}
          className="text-xl font-bold text-navy-700 dark:text-white"
        >
          <UniversalButton
            onClick={handleClearFields}
            text="Add  Project"
            baseColor="brand"
          />
        </div>
      </header>
      <hr className="mt-3" />
      {isLoading && isLoadingForUpload ? (
        <Loader extra="min-h-[7rem] bg-white" />
      ) : projects && projects.length > 0 ? (
        projects.map((project, index) =>
          project ? (
            <Project
              key={index}
              project={project}
              handleUpdateButtonClick={handleUpdateButtonClick}
              handleDeleteButtonClick={handleDeleteButtonClick}
              setDeleteModel={setDeleteModel}
              setProjectId={setProjectId}
            />
          ) : (
            <Loader />
          )
        )
      ) : (
        <p className="py-8 text-lg font-semibold text-gray-600">
          No Projects Found!
        </p>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => {
          cancelNotify();
          closeModal();
        }}
        modelTitle={modalTitle}
      >
        <form
          onSubmit={handleProjectSubmit}
          method="post"
          encType="multipart/form-data"
        >
          <InputField
            label="Project Name"
            name="projectName"
            type="text"
            value={formData.projectName}
            placeholder="Enter Project Name"
            handleChange={handleInputChange}
          />
          <InputField
            label="Short Description"
            name="shortDescription"
            type="text"
            value={formData.shortDescription}
            placeholder="Enter Project Name"
            handleChange={handleInputChange}
          />
          <JoditEditorField
            name="description"
            label="Project Content"
            value={formData.description}
            handleChange={handleInputChange}
          />
          <InputField
            label="Tech Used"
            name="techStack"
            type="text"
            value={formData.techStack}
            placeholder="Tech Used"
            handleChange={handleInputChange}
          />

          <InputField
            label="Project Link"
            type="text"
            name="projectLink"
            value={formData.projectLink}
            handleChange={handleInputChange}
          />
          <InputField
            label="Project Image"
            type="file"
            name="projectThumbnail"
            accept="image/*"
            handleChange={handleInputChange}
          />
          <div className="flex justify-end gap-4">
            <UniversalButton
              type="submit"
              baseColor="brand"
              extraClasses={`${
                isLoadingForUpload
                  ? "cursor-not-allowed bg-brand-300 hover:bg-brand-300 animate-pulse"
                  : ""
              } mt-2`}
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
        deleteModelTitle="Do really want to delete this project"
      />
    </Card>
  );
}
