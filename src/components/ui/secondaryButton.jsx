// Button Component
const SecondaryButton = ({ label, type = "enabled", disabled,  children }) => {
  // Define button type styles
  const typeClasses = {
    enabled: "bg-secondaire text-white hover:bg-[#0099B8]",
    disabled: "bg-gray-100 text-gray-500 cursor-not-allowed",
  };

  return (
    <button
      className={`flex items-center justify-center gap-1 font-semibold md:max-w-[530px] w-full py-[12px] text-[16px] rounded-[128px] md:py-[15px] md:text-[20px] md:rounded-[128px] ${
        typeClasses[disabled ? "disabled" : type]
      }`}
      disabled={disabled}
      type="submit"
    >
      {children}
      {label}
    </button>
  );
};

export default SecondaryButton;