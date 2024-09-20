import UniversalButton from "components/universalButton/UniversalButton";
import { MdDeleteOutline } from "react-icons/md";

export default function Knowlegde({ openModal, text, id }) {
  const deleteBadge = () => {
    openModal();
  };
  return (
    <li className=" flex items-center justify-center gap-3 rounded-md border-2 border-blue-200 px-4 py-1   ">
     
      {text}
      <UniversalButton
        type="button"
        baseColor=""
        text={<MdDeleteOutline size={22} />}
        extraClasses="px-[1px] border border-red-500 rounded-md py-[1px] text-red-500"
        onClick={deleteBadge}
      />
    </li>
  );
}
