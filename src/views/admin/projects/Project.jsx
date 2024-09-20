import UniversalButton from "components/universalButton/UniversalButton";
import { GoLink } from "react-icons/go";
import DOMPurify from "dompurify";

export default function Project({
  project,
  handleUpdateButtonClick,
  setDeleteModel,
  setProjectId,
}) {
  const sanitizedContent = DOMPurify.sanitize(project.description);
  const handleDelete = () => {
    setDeleteModel(true);
    setProjectId(project._id);
  }; 
  return (
    <div className="mt-3 flex w-full flex-col rounded-2xl bg-white p-4 shadow-lg transition-transform   dark:bg-navy-700 dark:shadow-none md:flex-row">
      <div className="  w-full justify-center md:w-1/4 md:justify-start">
        <img
          className=" rounded-lg object-cover"
          src={project.projectThumbnail}
          alt={project.projectName}
        />
        <div className="mr-4 mt-3  flex w-full justify-between gap-1 text-gray-600 dark:text-white">
          <UniversalButton
            onClick={() => handleUpdateButtonClick(project.slug)}
            text="Update"
            baseColor="brand"
          />
          <UniversalButton
            onClick={handleDelete}
            text="delete"
            baseColor="red"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-1 flex-col justify-center md:mt-0 md:ml-6">
        <h2 className="text-2xl font-bold capitalize text-navy-700 dark:text-white">
          {project.projectLink ? (
            <a
              href={
                project.projectLink.startsWith("http")
                  ? project.projectLink
                  : `https://${project.projectLink}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-bold text-navy-600 "
            >
              {project.projectName} <GoLink />
            </a>
          ) : (
            project.projectName
          )}
        </h2>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <strong className="text-gray-800 dark:text-gray-200">
            Technology Used:
          </strong>
          <span className="ml-1 font-medium capitalize text-brand-500 dark:text-brand-400">
            {project.techStack.slice(0, 3).join(" + ")}
          </span>
        </p>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <strong className="text-gray-800 dark:text-gray-200">
            Short Description:
          </strong>
          <p className="custom-scroller ml-1 mt-1 h-16 overflow-y-auto">
            {project.shortDescription}
          </p>
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <strong className="text-gray-800 dark:text-gray-200">
            Description:
          </strong>
          <p
            className="custom-scroller ml-1 mt-1 h-32 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <strong className="text-gray-800 dark:text-gray-200">
            Created At:
          </strong>
          <span className="ml-1 font-medium text-gray-800 dark:text-gray-200">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </p>
      </div>
    </div>
  );
}
