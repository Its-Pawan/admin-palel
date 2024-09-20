import { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

export default function JoditEditorField({ label,name,handleChange, value }) {
  const editor = useRef(null);
  const [content, setContent] = useState(value? value : "");
  const handleEditorChange = (newContent) => {
    setContent(newContent);
    handleChange({ target: { name, value: newContent } });
  };
  return (
    <div>
      <label className={`text-sm text-navy-700 dark:text-white ml-3 font-bold`}>
        {label}
      </label>
      <JoditEditor
        ref={editor}
        value={content}
        tabIndex={1}
        onChange={handleEditorChange} 
      />
    </div>
  );
}
