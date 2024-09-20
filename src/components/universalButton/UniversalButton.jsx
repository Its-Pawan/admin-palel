const UniversalButton = ({
  type,
  text,
  baseColor,
  extraClasses,
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={` ${extraClasses}  linear flex   items-center justify-center rounded-xl capitalize bg-${baseColor}-500 px-5 py-2 text-base font-normal text-white transition duration-200 hover:bg-${baseColor}-600 active:bg-${baseColor}-700`}
    >
      {text}
    </button>
  );
};

export default UniversalButton;
