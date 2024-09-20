import UniversalButton from "components/universalButton/UniversalButton";
import DOMPurify from "dompurify";
import DemoContent from "./DemoContent";

export default function Version({
  version,
  handleUpdateButtonClick,
  setDeleteModel,
  setVersionId,
}) {
  const sanitizedContent = DOMPurify.sanitize(version.content);
  const handleDelete = () => {
    setDeleteModel(true);
    setVersionId(version._id);
  };
  return (
    <div className="mb-4 flex w-full flex-col overflow-hidden rounded-lg border   md:max-h-96 md:flex-row md:p-8 ">
      <div className="flex-1 p-4">
        <div className="mb-4">
          <span className="block text-gray-600">Version:</span>
          <span className="text-lg text-gray-900 dark:text-white">
            {version.versionNumber}
          </span>
        </div>
        <div className="mb-4">
          <span className="block text-gray-600">Release Date:</span>
          <span className="text-lg text-gray-900 dark:text-white">
            {new Date(version.createdAt).toLocaleDateString("en-GB")}
          </span>
        </div>
        <div className="mb-4">
          <span className="block text-gray-600">Version Name:</span>
          <p className="text-gray-700 dark:text-white">{version.heading}</p>
        </div>
        <div className="mt-5 flex gap-2 ">
          <UniversalButton
            onClick={() => {
              handleUpdateButtonClick(version.versionNumber);
              setVersionId(version._id);
            }}
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
      <div className="h-full   flex-1 overflow-hidden p-4">
        <span className="block text-gray-600">Content:</span>
        <div
          className="custom-scroller max-h-80 overflow-auto overflow-y-auto pb-8 pr-2  text-gray-700 dark:text-white md:h-full"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
    </div>
  );
}
