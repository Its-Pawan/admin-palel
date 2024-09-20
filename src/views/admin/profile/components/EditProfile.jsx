import Card from "components/card";
import UniversalButton from "components/universalButton/UniversalButton";
import React from "react";
import { FaUserEdit } from "react-icons/fa";

const EditProfile = () => {
  return (
    <Card extra={"w-full h-full p-4"}>
      {/* Your storage */}
      <div className="mb-auto flex flex-col items-center justify-center">
        <div className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[26px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
          <FaUserEdit />
        </div>
        <h4 className="mb-px mt-3 text-2xl font-bold text-navy-700 dark:text-white">
          Edit Profile
        </h4>
        <p className="px-5 text-center text-base font-normal text-gray-600 md:!px-0 xl:!px-8">
         Update your profile
        </p>
        <UniversalButton
          type="button"
          text="Update Profile"
          baseColor="brand"
          extraClasses="mt-3"
        />
      </div>
    </Card>
  );
};

export default EditProfile;
