import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, modelTitle, extraClasses, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[22222] overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-800"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`inline-block w-full  transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl shadow-shadow-500 transition-all dark:!bg-navy-800   dark:text-white dark:shadow-none sm:my-8 sm:align-middle   md:w-[90%] ${extraClasses}`}
        >
          <div className="bg-white  px-4 pt-5 pb-4 shadow-3xl shadow-shadow-500  dark:!bg-navy-800 dark:text-white dark:shadow-none sm:p-6 sm:pb-4">
            <div className="mt-3 ">
              <div className="header flex justify-between">
                <h3 className="text-md font-medium leading-6 md:text-lg ">
                  {modelTitle}
                </h3>
                <h4
                  onClick={onClose}
                  className="ml-2 cursor-pointer rounded-full border-2 border-red-500 text-red-500 "
                >
                  <IoMdClose size={24} />
                </h4>
              </div>
              <hr className="mt-2" />

              <div className="mt-2">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
