import UniversalButton from "components/universalButton/UniversalButton";
import Modal from ".";
import { notifyError } from "components/utils/ToastNotifications";

{
  /*  use this component like this
<DeleteModel
  deleteModel={deleteModel}
  setDeleteModel={setDeleteModel}
  setConfirmDeletion={setConfirmDeletion}
  handleDeleteButtonClick={handleDeleteButtonClick}
  deleteModelTitle=""
/>; 
*/
}

export default function DeleteModel({
  deleteModel,
  setDeleteModel,
  setConfirmDeletion,
  handleDeleteButtonClick,
  deleteModelTitle,
  id,
}) {
  return (
    <>
      {deleteModel ? (
        <Modal
          isOpen={() => {
            setDeleteModel(true);
          }}
          onClose={() => {
            notifyError();
            setDeleteModel(false);
            setConfirmDeletion(false);
          }}
          extraClasses="md:w-fit"
          modelTitle={deleteModelTitle}
        >
          <div className="flex justify-start gap-4">
            <UniversalButton
              onClick={handleDeleteButtonClick}
              type="button"
              baseColor="red"
              extraClasses="mt-2"
              text="Delete Post"
            />
            <UniversalButton
              onClick={() => {
                notifyError();
                setDeleteModel(false);
                setConfirmDeletion(false);
              }}
              type="button"
              baseColor="brand"
              extraClasses="mt-2 t "
              text="Cancel"
            />
          </div>
        </Modal>
      ) : null}
    </>
  );
}
