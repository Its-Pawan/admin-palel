import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Upload from "./components/Upload";
import { getProfile } from "features/profile/profileSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"; 
import EditProfile from "./components/EditProfile";

const ProfileOverview = () => {
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-4 lg:!mb-0">
          <Banner profile={profile} />
        </div>

        <div className="col-span-3 lg:!mb-0">
          <EditProfile />
        </div>

        <div className="z-0 col-span-5 lg:!mb-0">
          <Upload />
        </div>
      </div>
      {/* all project & ... */}

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
         
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General profile={profile} />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <Project />
        </div>

      
      </div>
    </div>
  );
};

export default ProfileOverview;
