import Card from "components/card";
import InputField from "components/fields/InputField";
import Modal from "components/modal";
import UniversalButton from "components/universalButton/UniversalButton";
import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import Knowlegde from "./Knowlegde";
import {
  notifyError,
  notifySuccess,
} from "components/utils/ToastNotifications";
import DeleteModel from "components/modal/DeleteModel";
const Knowledges = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const notify = () => notifyError();

  const [formData, setFormData] = useState({
    skill: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeleteButtonClick = () => {
    setDeleteModel(false);
    setConfirmDeletion(true);
    if (confirmDeletion) {
      notifySuccess("Skill Deleted successfully"); 
    }
  };

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    notifySuccess("New Skill Added");
    closeModal();
    console.log(formData);
  };

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between py-3 pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          All Skills
        </div>
        <div
          onClick={openModal}
          className="text-xl font-bold text-navy-700 dark:text-white"
        >
          <UniversalButton text="Add New Skill" baseColor="brand" />
        </div>
      </header>
      <div className="  mb-6 overflow-x-scroll xl:overflow-x-hidden ">
        <ul className="inline-flex     gap-3">
          <Knowlegde text="React.JS" openModal={() => setDeleteModel(true)} />
        </ul>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          notify();
          closeModal();
        }}
        modelTitle="Add New Knowledge"
      >
        <form onSubmit={handleSkillSubmit} method="post">
          <InputField
            label="Skill Name"
            name="skill"
            type="text"
            handleChange={handleInputChange}
          />
          <div className="flex justify-end gap-4">
            <UniversalButton
              type="submit"
              baseColor="brand"
              extraClasses="mt-2"
              text="Add Skill"
            />
            <UniversalButton
              onClick={() => {
                notify();
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
        deleteModelTitle="Do really want to delete this skill"
      />
    </Card>
  );
};

export default Knowledges;
