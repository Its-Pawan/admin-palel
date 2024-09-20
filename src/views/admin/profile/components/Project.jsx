import { MdContentCopy, MdCheck } from "react-icons/md";
import image1 from "assets/img/profile/image1.png";
import Card from "components/card";
import { useState } from "react";

const Project = ({ imageSrc, linkUrl = "this-is-some-random-url" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(linkUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };
  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          All uploaded images
        </h4>
        <p className="mt-2 text-base text-gray-600">
          Here you can find all the images you have uploaded. <br /> Use this
          generate link to share or embed it anywhere for use.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        {/* Project 1 */}

        {/* <div className="flex w-full items-center justify-between  rounded-2xl  border-2 border-brand-500 bg-white p-1 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <div className="flex items-center  ">
            <div className="">
              <img
                className="h-[83px] w-[83px] rounded-lg"
                src={image1}
                alt=""
              />
            </div>
            <div className="ml-4">
              <a
                href="#"
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
              >
                technology-behind-the-blockchain
              </a>
            </div>
          </div>
        </div> */}
        <div className="flex w-full items-center justify-between rounded-2xl border-2 border-brand-500 bg-white p-1 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <div className="flex w-full  items-center ">
            <div>
              <img
                className="h-[83px] w-[83px] rounded-lg"
                src={imageSrc ? imageSrc : image1}
                alt="Thumbnail"
              />
            </div>
            <div
              style={{ width: "calc(100% - 83px)" }}
              className="ml-4 flex  items-center justify-between "
            >
              <a
                href={linkUrl}
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
              >
                {linkUrl}
              </a>
              {!copied ? (
                <button
                  onClick={handleCopy}
                  className="mr-3 flex items-center rounded-md border border-brand-500 p-1 text-sm font-normal text-brand-500 hover:text-brand-600 dark:text-white"
                >
                  <MdContentCopy className="mr-1" /> Copy URL
                </button>
              ) : (
                <p className="mr-4font-normal flex  items-center rounded-md border-0  p-1 text-sm text-green-500   dark:text-white">
                  <MdCheck className="mr-1" /> Copied
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Project;
