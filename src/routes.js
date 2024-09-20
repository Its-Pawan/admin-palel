import React from "react";
import Profile from "views/admin/profile";
import Blogs from "views/admin/blogs/Blogs";

// Icon Imports
import {
  MdPerson, MdOutlineLibraryAdd, MdLightbulbOutline, MdAutoAwesomeMotion, MdTimeline
} from "react-icons/md";
import Versions from "views/admin/versions/Versions";
import Knowledges from "views/admin/knowledges/Knowledges";
import Projects from "views/admin/projects";
const routes = [
  {
    name: "Blogs",
    layout: "/admin",
    path: "blogs",
    icon: <MdOutlineLibraryAdd className="h-6 w-6" />,
    component: <Blogs />,
  },
  {
    name: "Projects",
    layout: "/admin",
    path: "projects",
    icon: <MdAutoAwesomeMotion className="h-6 w-6" />,
    component: <Projects />,
  },
  {
    name: "Knowledges",
    layout: "/admin",
    path: "knowledges",
    icon: <MdLightbulbOutline className="h-6 w-6" />,
    component: <Knowledges />,
  },
  {
    name: "Application Version",
    layout: "/admin",
    path: "versions",
    icon: <MdTimeline className="h-6 w-6" />,
    component: <Versions />,
  },

  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },

];
export default routes;
