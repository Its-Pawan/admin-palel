import UniversalButton from "components/universalButton/UniversalButton";
import DOMPurify from "dompurify";
import { useEffect } from "react";
export default function BlogPost({
  handleUpdateButtonClick,
  setDeleteModel,
  blog,
  index,
  setBlogId,
}) {
  const sanitizedContent = DOMPurify.sanitize(blog.content);
  const handleDelete = () => {
    setDeleteModel(true);
    setBlogId(blog._id);
  };
  return (
    <tr className="border-t-2  ">
      <td className="py-2">{index}</td>
      <td className="py-2">{blog.title}</td>
      <td className="py-2">
        <div className="custom-scroller h-28 overflow-y-scroll"> {blog.description}</div>
      </td>
      <td className="py-2">
        <div
          className="custom-scroller h-28 overflow-y-scroll"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </td>
      <td className="py-2">{new Date(blog.createdAt).toLocaleDateString("en-GB")}</td>
      <td className="py-2">
        <img src={blog.thumbnail} alt={`${blog.title}'s Thumbnail`} />
      </td>
      <td className="mt-5 grid gap-2 pl-4">
        <UniversalButton
          onClick={() => handleUpdateButtonClick(blog.slug)}
          text="Update"
          baseColor="brand"
        />
        <UniversalButton onClick={handleDelete} text="Delete" baseColor="red" />
      </td>
    </tr>
  );
}
